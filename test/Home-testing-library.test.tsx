import * as Apollo from "@apollo/client";
import { PolarisTestProvider } from "@shopify/polaris";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { HttpResponse, graphql } from "msw";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { Home } from "../src/Home";
import { server } from "../src/mocks/node";

const { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, useQuery } =
  Apollo;

function renderApp() {
  const link = new HttpLink({
    uri: "http://localhost:5173/graphql",
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  render(
    <ApolloProvider client={client}>
      <PolarisTestProvider>
        <Home />
      </PolarisTestProvider>
    </ApolloProvider>,
  );
}

describe("Home component", () => {
  test("Home component should work with vi", async () => {
    const mockedUseQuery = vi.spyOn(Apollo, "useQuery").mockReturnValue({
      error: {
        message: "Oh no!",
      },
    } as ReturnType<typeof useQuery>);

    renderApp();
    await screen.findByText(/Error: Oh no!/i);

    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        fetchPolicy: "cache-and-network",
      }),
    );
  });

  test("Home component should render successfully on happy case", async () => {
    renderApp();

    const user = userEvent.setup();
    //   Wait for the loading indicator to disappear
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.getByText(/Movie 1/i)).toBeInTheDocument();

    expect(screen.getAllByRole("listitem").length).toBe(1);

    const addNewMovieButton = screen.getByRole("button", { name: "Add Movie" });
    await user.click(addNewMovieButton);

    // await screen.findByText("Total count: 2");
  });

  test("Home component should render successfully on error case", async () => {
    server.use(
      graphql.query("ListMovies", () => {
        return HttpResponse.json({
          errors: [
            {
              message: `Cannot succeed!`,
            },
          ],
        });
      }),
    );

    renderApp();

    // Wait for the loading indicator to disappear
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.queryByText("Error: Cannot succeed!")).toBeInTheDocument();
  });
});

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

vi.mock("@apollo/client", async () => {
  const mod =
    await vi.importActual<typeof import("@apollo/client")>("@apollo/client");
  return {
    ...mod,
  };
});

function renderApp() {
  const link = new Apollo.HttpLink({
    uri: "http://localhost:5173/graphql",
  });

  const client = new Apollo.ApolloClient({
    link,
    cache: new Apollo.InMemoryCache(),
  });

  render(
    <Apollo.ApolloProvider client={client}>
      <PolarisTestProvider>
        <Home />
      </PolarisTestProvider>
    </Apollo.ApolloProvider>,
  );
}

describe("Home component", () => {
  test("Home component should work with vi", async () => {
    vi.spyOn(Apollo, "useQuery").mockReturnValue({
      error: {
        message: "Oh no!",
      },
    } as ReturnType<typeof Apollo.useQuery>);

    renderApp();
    await screen.findByText(/Error: Oh no!/i);
  });

  test("Home component should render successfully on happy case", async () => {
    const apollo =
      await vi.importActual<typeof import("@apollo/client")>("@apollo/client");

    apollo.useQuery = (
      await vi.importActual<typeof import("@apollo/client")>("@apollo/client")
    ).useQuery;

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

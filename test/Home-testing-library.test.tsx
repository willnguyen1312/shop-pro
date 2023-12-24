import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
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
import { describe, expect, test } from "vitest";
import { Home } from "../src/Home";
import { server } from "../src/mocks/node";

const link = new HttpLink({
  uri: "http://localhost:5173/graphql",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function renderApp() {
  render(
    <ApolloProvider client={client}>
      <PolarisTestProvider>
        <Home />
      </PolarisTestProvider>
    </ApolloProvider>,
  );
}

describe("Home component", () => {
  test("Home component should render successfully on happy case", async () => {
    renderApp();

    const user = userEvent.setup();
    //   Wait for the loading indicator to disappear
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.queryByText(/Movie 1/i)).toBeInTheDocument();

    expect(screen.getAllByRole("listitem").length).toBe(3);

    const addNewMovieButton = screen.getByRole("button", { name: "Add Movie" });
    await user.click(addNewMovieButton);

    await screen.findByText("Total count: 4");
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

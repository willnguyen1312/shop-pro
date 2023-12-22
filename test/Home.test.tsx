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
import React from "react";
import { expect, test } from "vitest";
import { Home } from "../src/Home";

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
    </ApolloProvider>
  );
}

test("Home component should render expectedly", async () => {
  renderApp();

  const user = userEvent.setup();
  //   Wait for the loading indicator to disappear
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  expect(screen.queryByText("The Matrix")).toBeInTheDocument();

  const refreshButton = screen.getByRole("button", { name: "Refresh" });
  await user.click(refreshButton);

  //   Wait for the loading indicator to disappear
  await waitForElementToBeRemoved(() => screen.getByText("Refreshing"));

  expect(screen.getAllByRole("listitem").length).toBe(5);

  const addNewMovieButton = screen.getByRole("button", { name: "Add Movie" });
  await user.click(addNewMovieButton);

  await screen.findByText("Total count: 7");
});

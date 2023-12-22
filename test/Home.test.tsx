import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
// import { userEvent } from "@testing-library/user-event";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import fetch from "cross-fetch";
import { expect, test } from "vitest";
import { Home } from "../src/Home";

// Mock window.matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const link = new HttpLink({
  uri: "http://localhost:5173/graphql",

  // Use explicit `window.fetch` so tha outgoing requests
  // are captured and deferred until the Service Worker is ready.
  fetch: (...args) => fetch(...args),
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function setup() {
  render(
    <ApolloProvider client={client}>
      <AppProvider i18n={enTranslations}>
        <Home />
      </AppProvider>
    </ApolloProvider>,
  );
}

test("loads and displays greeting", async () => {
  setup();

  //   Wait for the loading indicator to disappear
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  expect(screen.queryByText("The Matrix")).toBeInTheDocument();

  // await fetch(new URL("/graphql", location.href), {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     query: `
  //       query ListMovies {
  //         movies {
  //           title
  //         }
  //       }
  //     `,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((response) => {
  //     console.log(response.data.movies.length);
  //   });
});

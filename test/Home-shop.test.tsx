import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { PolarisTestProvider } from "@shopify/polaris";
import { mount } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import "@testing-library/jest-dom";
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
  return mount(
    <ApolloProvider client={client}>
      <PolarisTestProvider>
        <Home />
      </PolarisTestProvider>
    </ApolloProvider>,
  );
}

test("Home component should render loading on first load", async () => {
  const wrapper = renderApp();

  expect(wrapper).toContainReactComponentTimes("p", 1, {
    children: "Loading...",
  });
});

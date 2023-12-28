import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import * as React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { PolarisTestProvider } from "@shopify/polaris";
import { Home } from "../src/Home";
import { server } from "../src/mocks/node";

import { HttpResponse, graphql } from "msw";

test("integration flow", async () => {
  const movies: {
    title: string;
    id: string;
  }[] = [];

  server.use(
    graphql.query("ListMovies", async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      movies.push({
        title: `Movie ${movies.length + 1}`,
        id: `movie-${movies.length + 1}`,
      });
      return HttpResponse.json({
        data: {
          movies,
        },
      });
    }),
  );

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/noop",
      element: "noop",
    },
  ];

  const router = createMemoryRouter(routes);

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
        <RouterProvider router={router} />
      </PolarisTestProvider>
    </ApolloProvider>,
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await screen.findByText("Movie 1");

  await act(async () => await router.navigate("/noop"));

  await act(() => router.navigate("/"));

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await screen.findByText("Movie 2");
});

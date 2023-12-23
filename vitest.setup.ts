import { destroyAll } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./src/mocks/node";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  destroyAll();
});

afterAll(() => {
  server.close();
});

// https://vitest.dev/api/vi.html#vi-unmock

import { expect, it, vi } from "vitest";
import { increment } from "./increment";

// increment is already mocked, because vi.mock is hoisted
increment(1) === 100;

// this is hoisted, and factory is called before the import on line 1
vi.mock("./increment", () => ({ increment: () => 100 }));

// all calls are mocked, and `increment` always returns 100
increment(1) === 100;
increment(30) === 100;

// this is not hoisted, so other import will return unmocked module
vi.unmock("./increment");

// this STILL returns 100, because `vi.doUnmock` doesn't reevaluate a module
increment(1) === 100;
increment(30) === 100;

it("should work", async () => {
  // the next import is unmocked, now `increment` is the original function that returns count + 1
  //   const { increment: unmockedIncrement } = await import("./increment.js");

  expect(increment(1)).toBe(2);
  //   unmockedIncrement(30) === 31;
});

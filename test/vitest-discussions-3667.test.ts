// Reference - https://github.com/vitest-dev/vitest/discussions/3667

import { describe, expect, it, vi } from "vitest";
import * as stuff from "./vitest-discussions-3667";

const getUser = (email: string): string => {
  const user = stuff.getUserFromCache(email);
  if (!user) {
    return stuff.getUserFromDb(email);
  }
  return user;
};

describe("stuff", () => {
  it("should work for getUserFromDb", () => {
    const mockedGetUserFromDb = vi.spyOn(stuff, "getUserFromDb");
    mockedGetUserFromDb.mockImplementation(() => "mocked getUserFromDb");
    expect(stuff.getUserFromDb("test")).toEqual("mocked getUserFromDb");
  });

  it("should work for getUserFromCache", () => {
    const mockedGetUserFromCache = vi.spyOn(stuff, "getUserFromCache");
    mockedGetUserFromCache.mockImplementation(() => "mocked getUserFromCache");
    expect(stuff.getUserFromCache("test")).toEqual("mocked getUserFromCache");
  });

  it("should work for getUser 1", () => {
    const mockedGetUserFromDb = vi.spyOn(stuff, "getUserFromDb");
    mockedGetUserFromDb.mockImplementation(() => "mocked getUserFromDb");
    const mockedGetUserFromCache = vi.spyOn(stuff, "getUserFromCache");
    mockedGetUserFromCache.mockImplementation(() => "mocked getUserFromCache");

    expect(getUser("test")).toEqual("mocked getUserFromCache");
  });

  it("should work for getUser 1", () => {
    const mockedGetUserFromDb = vi.spyOn(stuff, "getUserFromDb");
    mockedGetUserFromDb.mockImplementation(() => "mocked getUserFromDb");
    const mockedGetUserFromCache = vi.spyOn(stuff, "getUserFromCache");
    mockedGetUserFromCache.mockImplementation(() => "");

    expect(getUser("test")).toEqual("mocked getUserFromDb");
  });
});

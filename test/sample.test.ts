import { afterEach, describe, expect, it, vi } from "vitest";

import { getLatest, messages } from "./sample";

describe("reading messages", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get the latest message with a spy", () => {
    const spy = vi.spyOn(messages, "getLatest");
    expect(spy.getMockName()).toEqual("getLatest");

    expect(messages.getLatest()).toEqual(
      messages.items[messages.items.length - 1],
    );

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockImplementationOnce(() => ({
      message: "Sample",
      from: "Sample",
    }));
    expect(messages.getLatest()).toEqual({
      message: "Sample",
      from: "Sample",
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should get with a mock", () => {
    const mock = vi.fn().mockImplementation(getLatest);

    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    expect(mock).toHaveBeenCalledTimes(1);

    mock.mockImplementationOnce(() => "access-restricted");
    expect(mock()).toEqual("access-restricted");

    expect(mock).toHaveBeenCalledTimes(2);

    expect(mock()).toEqual(messages.items[messages.items.length - 1]);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});

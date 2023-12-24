import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ApiData, ApiDataWithoutCustomHook, AsyncData } from "../src/Data";

describe("AsyncData component with testing library", () => {
  it("should render", async () => {
    vi.useFakeTimers();
    const { container } = render(<AsyncData />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><button>Click me</button></div>"`,
    );

    user.click(button);

    await vi.runAllTimersAsync();

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><button>Click me</button><p>Value: 1</p></div>"`,
    );
    vi.useRealTimers();
  });
});

describe("ApiData component with testing library", () => {
  it("should render", async () => {
    const { container } = render(<ApiData />);

    expect(container.innerHTML).toMatchInlineSnapshot(`"<p>Value: 0</p>"`);

    await screen.findByText("Value: 1");

    expect(container.innerHTML).toMatchInlineSnapshot(`"<h1>Value: 1</h1>"`);
  });
});

describe("ApiDataWithoutCustomHook component with testing library", () => {
  it("should render", async () => {
    const { container } = render(<ApiDataWithoutCustomHook />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h1>Value: 0</h1><button>Click</button>"`,
    );

    await user.click(button);
    await screen.findByText("Value: 1");

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h1>Value: 1</h1><button>Click</button>"`,
    );
  });
});

import { mount } from "@shopify/react-testing";
import { act, render, screen } from "@testing-library/react";

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const Playground = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setCount(1);
    }, 100);
  }, []);

  return (
    <div>{count === 0 ? <p>Value: {count}</p> : <h1>Value: {count}</h1>}</div>
  );
};

describe("Playground", () => {
  it("should render", async () => {
    const wrapper = mount(<Playground />);

    // Wait 200ms
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div><h1>Value: 1</h1></div>"`
    );
    expect(wrapper.debug()).toMatchInlineSnapshot(`
        "<Playground>
          <div>
            <p />
          </div>
        </Playground>"
      `);
  });
});

describe("Playground with rtl", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should render correctly", async () => {
    render(<Playground />);

    act(() => vi.runAllTimers());

    screen.getByText("Value: 1");
  });
});

it("should update the memory tree", async () => {
  const App = () => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      setTimeout(() => {
        setCount(1);
      }, 100);
    }, []);

    return (
      <div>
        <button
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            setCount(count + 1);
          }}
        >
          Click me
        </button>
        <p>Value: {count}</p>
      </div>
    );
  };

  const wrapper = mount(<App />);

  // Wait 200ms
  await new Promise((resolve) => setTimeout(resolve, 200));

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<div><button>Click me</button><p>Value: 1</p></div>"`
  );

  expect(wrapper).toContainReactComponent("p", {
    children: ["Value: ", 0],
  });
});

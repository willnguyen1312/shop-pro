import { mount } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, it, test, vi } from "vitest";

vi.spyOn(console, "error").mockImplementation(() => {});

export const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return <div>{isLoading ? <p>Loading</p> : <h1>Loaded</h1>}</div>;
};

test("it should rock like a charm", async () => {
  vi.useFakeTimers();
  const wrapper = mount(<App />);
  expect(wrapper.html()).toMatchInlineSnapshot(`"<div><p>Loading</p></div>"`);
  expect(wrapper.debug()).toMatchInlineSnapshot(`
    "<App>
      <div>
        <p />
      </div>
    </App>"
  `);

  await vi.runAllTimersAsync();

  //   🐛 Buggy because it returns <p>Loading</p> instead of <h1>Loaded</h1>
  expect(wrapper.html()).toMatchInlineSnapshot(`"<div><h1>Loaded</h1></div>"`);
  expect(wrapper.debug()).toMatchInlineSnapshot(`
    "<App>
      <div>
        <p />
      </div>
    </App>"
  `);
});

it("should not be a problems with testing-library", async () => {
  vi.useFakeTimers();
  render(<App />);

  expect(screen.getByText("Loading")).toBeInTheDocument();
  await vi.runAllTimersAsync();

  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

export const AsyncApp = () => {
  const [counter, setCounter] = React.useState(0);

  if (counter % 2) {
    return (
      <main>
        <button
          onClick={() => {
            setTimeout(() => {
              setCounter(counter + 1);
            }, 200);
          }}
        >
          Click me
        </button>
        <h1>Value: {counter}</h1>
      </main>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setTimeout(() => {
            setCounter(counter + 1);
          }, 200);
        }}
      >
        Click me
      </button>
      <p>Value: {counter}</p>
    </div>
  );
};

it("is not very interactive", async () => {
  vi.useFakeTimers();
  const wrapper = mount(<AsyncApp />);
  expect(wrapper.find("p")).toContainReactText("Value: 0");
  wrapper.find("button")?.trigger("onClick");
  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<div><button>Click me</button><p>Value: 0</p></div>"`
  );

  await vi.runAllTimersAsync();

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<div><button>Click me</button><p>Value: 0</p></div>"`
  );
});

it("fine with testing-library", async () => {
  vi.useFakeTimers();

  render(<AsyncApp />);

  expect(screen.getByText("Value: 0")).toBeInTheDocument();

  screen.getByRole("button").click();

  await vi.runAllTimersAsync();

  expect(screen.getByText("Value: 1")).toBeInTheDocument();
});

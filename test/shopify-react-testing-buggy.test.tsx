import { expect, it, test, vi } from "vitest";
import { mount } from "@shopify/react-testing";
import React from "react";
import { render, screen } from "@testing-library/react";

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

  expect(wrapper.find("p")).toContainReactText("Loading");

  await vi.runAllTimersAsync();

  //   🐛 Buggy because it returns <p>Loading</p> instead of <h1>Loaded</h1>
  expect(wrapper.html()).toMatchInlineSnapshot(`"<div><h1>Loaded</h1></div>"`);
  expect(wrapper.find("h1")).toMatchInlineSnapshot(`null`);
  expect(wrapper.find("p")?.html()).toMatchInlineSnapshot(`"<p>Loading</p>"`);
});

it("should not be a problems with testing-library", async () => {
  vi.useFakeTimers();
  render(<App />);

  expect(screen.getByText("Loading")).toBeInTheDocument();
  await vi.runAllTimersAsync();

  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

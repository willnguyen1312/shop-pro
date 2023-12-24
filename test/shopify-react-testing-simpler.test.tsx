import { mount } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import React from "react";
import { expect, test, vi } from "vitest";

export const App = () => {
  const [counter, setCounter] = React.useState(0);

  const asyncIncrement = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        setCounter(counter + 1);
        resolve(void 0);
      }, 100);
    });
  };

  return (
    <>
      <h1>Value: {counter}</h1>
      <button onClick={asyncIncrement}>Increment</button>
    </>
  );
};

test("it should pass", async () => {
  vi.useFakeTimers();
  const wrapper = mount(<App />);

  const incrementButton = wrapper.find("button");
  const textElement = wrapper.find("h1");

  incrementButton?.trigger("onClick");

  expect(textElement?.text()).toBe("Value: 0");

  // Flush all timers with vitest
  await vi.runAllTimersAsync();

  expect(textElement?.text()).toBe("Value: 1");
  vi.useRealTimers();
});

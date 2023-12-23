import { expect, test, vi } from "vitest";
import { mount } from "@shopify/react-testing";
import React from "react";

export const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return <p>Loaded</p>;
};

test("it should rock like a charm", async () => {
  vi.useFakeTimers();
  const wrapper = mount(<App />);

  expect(wrapper.find("p")).toContainReactText("Loading");

  // sleep 200ms
  vi.runAllTimers();

  expect(wrapper.find("p")).toContainReactText("Loaded");
});

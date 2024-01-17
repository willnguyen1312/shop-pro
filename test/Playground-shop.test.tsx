import { PolarisTestProvider } from "@shopify/polaris";
import { mount } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

const Playground = () => {
  const [third, setThird] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setThird(1 + 2);
    }, 0);
  }, []);

  return (
    <div>
      <h1>Playground</h1>
      <p role="status">Third: {third}</p>
    </div>
  );
};

function renderApp() {
  return mount(
    <PolarisTestProvider>
      <Playground />
    </PolarisTestProvider>
  );
}

test("Playground component should render successfully", async () => {
  const wrapper = renderApp();

  expect(wrapper).toContainReactText("Third: 0");

  await waitFor(() => expect(wrapper).toContainReactText("Third: 3"));
});

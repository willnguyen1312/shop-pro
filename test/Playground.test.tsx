import { mount } from "@shopify/react-testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

const useCount = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setCount(1);
    }, 100);
  }, []);

  return { count };
};

const Playground = () => {
  const { count } = useCount();

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
  it("should render correctly", async () => {
    render(<Playground />);

    await screen.findByText("Value: 1");
  });
});

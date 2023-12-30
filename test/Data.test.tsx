import { mount } from "@shopify/react-testing";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ApiData, ApiDataWithoutCustomHook, AsyncData } from "../src/Data";

describe.only("AsyncData component", () => {
  it("should render", async () => {
    vi.useFakeTimers();
    const wrapper = mount(<AsyncData />);

    // OUTPUT IS HERE 😇
    // screen.logTestingPlaygroundURL();
    // console.log(document.body.innerHTML);

    const button = wrapper.find("button");

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div><button>Click me</button></div>"`
    );
    expect(wrapper.debug()).toMatchInlineSnapshot(`
      "<AsyncData>
        <div>
          <button onClick={[Function handleClick]} />
        </div>
      </AsyncData>"
    `);

    button?.trigger("onClick");

    await vi.runAllTimersAsync();
    // OR

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div><button>Click me</button><p>Value: 1</p></div>"`
    );
    expect(wrapper.debug()).toMatchInlineSnapshot(`
      "<AsyncData>
        <div>
          <button onClick={[Function handleClick]} />
        </div>
      </AsyncData>"
    `);

    vi.useRealTimers();
  });
});

describe("ApiData component", () => {
  it("should render", async () => {
    const wrapper = mount(<ApiData />);

    expect(wrapper.html()).toMatchInlineSnapshot(`"<p>Value: 0</p>"`);
    expect(wrapper.debug()).toMatchInlineSnapshot(`
      "<ApiData>
        <p />
      </ApiData>"
    `);

    // // Wait a bit for the fetch to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(wrapper.html()).toMatchInlineSnapshot(`"<p>Value: 0</p>"`);
    expect(wrapper.debug()).toMatchInlineSnapshot(`
      "<ApiData>
        <p />
      </ApiData>"
    `);
  });
});

describe("ApiDataWithoutCustomHook component", () => {
  it("should render", async () => {
    const wrapper = mount(<ApiDataWithoutCustomHook />);
    const button = wrapper.find("button");

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<h1>Value: 0</h1><button>Click</button>"`
    );
    expect(wrapper.debug()).toMatchInlineSnapshot(`
      "<ApiDataWithoutCustomHook>
        <h1 />
        <button onClick={[Function fetchData]} />
      </ApiDataWithoutCustomHook>"
    `);

    button?.trigger("onClick");

    // // Wait a bit for the fetch to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<h1>Value: 1</h1><button>Click</button>"`
    );
    expect(wrapper.debug()).toMatchInlineSnapshot(`
      "<ApiDataWithoutCustomHook>
        <h1 />
        <button onClick={[Function fetchData]} />
      </ApiDataWithoutCustomHook>"
    `);
  });
});

import React from "react";

export const AsyncData = () => {
  const [counter, setCounter] = React.useState(0);

  async function handleClick() {
    // Wait 250ms before updating the counter
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCounter(counter + 1);
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {counter > 0 && <p>Value: {counter}</p>}
    </div>
  );
};

const useData = () => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    let isFetching = false;
    async function fetchData() {
      if (isFetching) {
        return;
      }
      const result = await fetch(new URL("/api/counter", location.href)).then(
        (res) => res.json()
      );
      setCounter(result.data.counter);
    }
    fetchData();

    return () => {
      isFetching = true;
    };
  }, []);

  return { counter };
};

export const ApiData = () => {
  const { counter } = useData();

  if (counter) {
    return <h1>Value: {counter}</h1>;
  }

  return <p>Value: {counter}</p>;
};

export const ApiDataWithoutCustomHook = () => {
  const [counter, setCounter] = React.useState(0);

  async function fetchData() {
    const result = await fetch(new URL("/api/counter", location.href)).then(
      (res) => res.json()
    );
    setCounter(result.data.counter);
  }

  return (
    <>
      <h1>Value: {counter}</h1>
      <button onClick={fetchData}>Click</button>
    </>
  );
};

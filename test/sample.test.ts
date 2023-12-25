import { expect, test, vi } from "vitest";

async function getResult() {
  let a = 0;
  await new Promise((resolve) => {
    setTimeout(resolve, 50000);
    a = 100;
  });

  return a;
}

test("adds 1 + 2 to equal 3", async () => {
  vi.useFakeTimers();

  const getResultPromise = getResult(); // Start the promise
  await vi.runAllTimersAsync(); // Advance all timers

  const a = await getResultPromise; // Now get the result

  expect(a).toBe(100);
  vi.useRealTimers();
});

test("fake setTimeout", async () => {
  vi.useFakeTimers();

  let a = 10;

  setTimeout(() => {
    a = 50;
  }, 4000);

  await vi.runAllTimersAsync();

  expect(a).toBe(50);

  vi.useRealTimers();
});

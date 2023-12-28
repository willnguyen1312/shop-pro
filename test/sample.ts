export function getLatest(index = messages.items.length - 1) {
  return messages.items[index];
}

export const messages = {
  items: [{ message: "Simple test message", from: "Testman" }],
  getLatest,
};

export function callApi() {
  return "Real";
}

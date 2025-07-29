// @jest-environment jsdom

import '@testing-library/jest-dom';

// Here, add portions of the warning messages you want to intentionally prevent from appearing
const MESSAGES_TO_IGNORE = [
  'When testing, code that causes React state updates should be wrapped into act(...):',
  'Error:',
  'The above error occurred',
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((message) =>
    args.toString().includes(message)
  );
  if (!ignoreMessage) originalError(...args);
};

// --- SAFELY PATCH ResizeObserver ONLY WHEN window EXISTS ---
beforeEach(() => {
  // Save original ResizeObserver if it exists
  global._originalResizeObserver = global.ResizeObserver;

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  // Restore original ResizeObserver if it was defined
  if (global._originalResizeObserver) {
    global.ResizeObserver = global._originalResizeObserver;
    delete global._originalResizeObserver;
  } else {
    delete global.ResizeObserver;
  }

  jest.restoreAllMocks();
});
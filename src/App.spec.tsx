import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe.skip("App component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip("should render Hello", () => {
    render(<App />);

    const helloElement = screen.getByText(/Hello/i);

    expect(helloElement).toBeDefined();
  });
});

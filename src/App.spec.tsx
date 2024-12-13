import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("should render Hello", () => {
    render(<App />);

    const helloElement = screen.getByText(/Hello/i);

    expect(helloElement).toBeDefined();
  });
});

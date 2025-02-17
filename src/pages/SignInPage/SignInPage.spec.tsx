import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SignInPage from "./SignInPage";

describe.skip("SignIn component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render sign in form fields", () => {
    render(<SignInPage />);

    const emailInput = screen.getByTestId("sign-in-email-field");
    const passwordInput = screen.getByTestId("sign-in-password-field");
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    expect(emailInput.innerHTML).toEqual("Email");
    expect(passwordInput.innerHTML).toEqual("Password");
    expect(submitButton.innerHTML).toEqual("Sign in");
  });
});

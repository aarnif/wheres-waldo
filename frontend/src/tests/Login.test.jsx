import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Auth/Login";
import { BrowserRouter as Router } from "react-router-dom";

test("renders content", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const element = screen.getByTestId("sign-in-header");

  expect(element).toHaveTextContent("Sign In");

  expect(element).toBeDefined();
});

test("Login-form takes credentials as input and has a sign-in button", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const user = userEvent.setup();

  const userNameInput = screen.getByTestId("username-input");
  const passwordInput = screen.getByTestId("password-input");
  const button = screen.getByTestId("sign-in-button");

  await user.type(userNameInput, "test");
  await user.type(passwordInput, "password");

  expect(button).toHaveTextContent("Sign In");
  expect(userNameInput.value).toBe("test");
  expect(passwordInput.value).toBe("password");
});

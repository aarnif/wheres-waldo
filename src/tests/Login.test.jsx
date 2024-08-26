import { render, screen } from "@testing-library/react";
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

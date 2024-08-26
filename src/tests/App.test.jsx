import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders content", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const element = screen.getByText("Where's Waldo");

  expect(element).toBeDefined();
});

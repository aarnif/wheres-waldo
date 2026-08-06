import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import App from "../App";

const renderComponent = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );

describe("<App />", () => {
  test("renders home page at /", async () => {
    renderComponent(["/"]);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Home" })).toBeDefined();
    });
  });

  test("renders game page at /games/:id", async () => {
    renderComponent(["/games/1"]);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Game 1" })).toBeDefined();
    });
  });

  test("renders signup page at /signup", async () => {
    renderComponent(["/signup"]);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Signup" })).toBeDefined();
    });
  });
});

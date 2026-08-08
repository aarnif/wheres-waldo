import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, test } from "vitest";
import App from "../App";
import { mockGames } from "./mocks/games";

vi.mock("../services/games", () => ({
  getGames: vi.fn(),
}));

const renderComponent = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );

describe("<App />", () => {
  test("renders home page at /", async () => {
    const { getGames } = await import("../services/games");
    vi.mocked(getGames).mockResolvedValue(mockGames);

    renderComponent(["/"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Where's Waldo" }),
      ).toBeDefined();
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

  test("sign up link navigates to sign up page", async () => {
    const { getGames } = await import("../services/games");
    vi.mocked(getGames).mockResolvedValue(mockGames);

    const user = userEvent.setup();
    renderComponent();

    const signUpLink = screen.getByRole("link", { name: "Sign Up" });
    await user.click(signUpLink);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Signup" })).toBeDefined();
    });
  });

  test("game card link navigates to game page", async () => {
    const { getGames } = await import("../services/games");
    vi.mocked(getGames).mockResolvedValue(mockGames);

    const firstGame = mockGames[0];
    const { id } = firstGame;

    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Where's Waldo" }),
      ).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByTestId(`game-card-${id}`)).toBeDefined();
    });

    const gameCardLink = screen.getByTestId(`game-card-${id}`);
    await user.click(gameCardLink);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Game 1" })).toBeDefined();
    });
  });
});

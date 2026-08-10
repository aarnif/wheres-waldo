import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, test, beforeEach } from "vitest";
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
  describe("Home page", () => {
    beforeEach(async () => {
      const { getGames } = await import("../services/games");
      vi.mocked(getGames).mockResolvedValue(mockGames);
    });

    test("renders the page", async () => {
      renderComponent();

      await waitFor(() => {
        expect(
          screen.getByRole("heading", { name: "Where's Waldo" }),
        ).toBeDefined();
      });
    });

    test("navigates to the signup page when sign up link is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      const signUpLink = screen.getByRole("link", { name: "Sign Up" });
      await user.click(signUpLink);

      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
      });
    });

    test("navigates to the game page when a game card is clicked", async () => {
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

  describe("Game page", () => {
    test("renders the page", async () => {
      renderComponent(["/games/1"]);

      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "Game 1" })).toBeDefined();
      });
    });
  });

  describe("Signup page", () => {
    test("renders the page", async () => {
      renderComponent(["/signup"]);

      await waitFor(() => {
        expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
      });
    });
  });
});

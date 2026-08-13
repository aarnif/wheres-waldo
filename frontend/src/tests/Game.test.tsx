import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi, describe, expect, test, beforeEach } from "vitest";
import AuthProvider from "../components/AuthProvider";
import Game from "../pages/Game";
import { mockGameDetails } from "./mocks/games";

vi.mock("../services/games", () => ({
  getGameById: vi.fn(),
}));

describe("<Game />", () => {
  beforeEach(async () => {
    const { getGameById } = await import("../services/games");
    vi.mocked(getGameById).mockResolvedValue(mockGameDetails);
  });

  test("renders game preview", async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/games/1"]}>
          <Game />
        </MemoryRouter>
      </AuthProvider>,
    );

    const {
      title,
      description,
      difficulty,
      characters: gameCharacters,
    } = mockGameDetails;

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: title })).toBeDefined();
      expect(screen.getByText(description)).toBeDefined();
      expect(
        screen.getByText(difficulty[0].toUpperCase() + difficulty.slice(1)),
      ).toBeDefined();
      expect(screen.getByRole("link", { name: "Go Back" })).toBeDefined();
      expect(screen.getByRole("button", { name: "Play Game" })).toBeDefined();
    });

    gameCharacters.forEach(({ character }) => {
      expect(screen.getByText(character.displayName)).toBeDefined();
    });
  });
});

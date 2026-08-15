import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, test, beforeEach } from "vitest";
import AuthProvider from "../components/AuthProvider";
import Game from "../pages/Game";
import { mockGameDetails } from "./mocks/games";

vi.mock("../services/games", () => ({
  getGameById: vi.fn(),
}));

const renderComponent = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/games/1"]}>
        <Game />
      </MemoryRouter>
    </AuthProvider>,
  );

describe("<Game />", () => {
  beforeEach(async () => {
    const { getGameById } = await import("../services/games");
    vi.mocked(getGameById).mockResolvedValue(mockGameDetails);
  });

  test("renders game preview", async () => {
    renderComponent();

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

  test("shows game start modal when play game button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const { title, characters: gameCharacters } = mockGameDetails;

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Play Game" })).toBeDefined();
    });

    const playGameButton = screen.getByRole("button", { name: "Play Game" });
    await user.click(playGameButton);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: title })).toBeDefined();
      expect(
        screen.getByText("Find and click on each character in the image"),
      ).toBeDefined();
      expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
      expect(screen.getByRole("button", { name: "Let's Play" })).toBeDefined();
    });

    gameCharacters.forEach(({ character }) => {
      expect(screen.getByText(character.displayName)).toBeDefined();
    });
  });
});

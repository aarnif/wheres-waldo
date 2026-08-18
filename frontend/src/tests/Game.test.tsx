import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { vi, describe, expect, test, beforeEach } from "vitest";
import AuthProvider from "../components/AuthProvider";
import Game from "../pages/Game";
import { mockGameDetails } from "./mocks/games";
import type { GameCharacter } from "../types";

const CANVAS_RECT = {
  left: 0,
  top: 0,
  width: 1000,
  height: 600,
  right: 1000,
  bottom: 600,
  x: 0,
  y: 0,
  toJSON: () => {},
};

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

const openGameStartModal = async (user: UserEvent) => {
  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Play Game" })).toBeDefined();
  });

  const playGameButton = screen.getByRole("button", { name: "Play Game" });
  await user.click(playGameButton);
};

const clickStartGame = async (user: UserEvent) => {
  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Let's Play" })).toBeDefined();
  });

  const letsPlayButton = screen.getByRole("button", { name: "Let's Play" });
  await user.click(letsPlayButton);
};

const clickCharacter = (character: GameCharacter) => {
  const gameCanvas = screen.getByTestId("game-canvas");
  vi.spyOn(gameCanvas, "getBoundingClientRect").mockReturnValue(CANVAS_RECT);

  const { x, y, width, height } = character;
  const clientX = (x + width / 2) * CANVAS_RECT.width;
  const clientY = (y + height / 2) * CANVAS_RECT.height;

  fireEvent.click(gameCanvas, { clientX, clientY });
};

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

    await openGameStartModal(user);

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

  test("shows game preview when cancel button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await openGameStartModal(user);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);

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

  test("starts new game when let's play button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await openGameStartModal(user);
    await clickStartGame(user);

    const { title } = mockGameDetails;

    await waitFor(() => {
      expect(
        screen.queryByText("Find and click on each character in the image"),
      ).toBeNull();
      expect(screen.queryByRole("button", { name: "Cancel" })).toBeNull();
      expect(screen.queryByRole("button", { name: "Let's Play" })).toBeNull();
      expect(screen.getByRole("heading", { name: title })).toBeDefined();
      expect(screen.getByRole("button", { name: "Quit" })).toBeDefined();

      const timeDisplay = screen.getByTestId("game-time");
      expect(timeDisplay.textContent).toMatch(/^0:00/);
    });
  });

  test("shows game preview when quit button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await openGameStartModal(user);
    await clickStartGame(user);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Quit" })).toBeDefined();
    });

    const quitButton = screen.getByRole("button", { name: "Quit" });
    await user.click(quitButton);

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

  test("shows game marker when character is clicked on canvas", async () => {
    const user = userEvent.setup();
    renderComponent();

    await openGameStartModal(user);
    await clickStartGame(user);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Quit" })).toBeDefined();
    });

    const character = mockGameDetails.characters[0];

    clickCharacter(character);

    await waitFor(() => {
      expect(screen.getByTestId("game-mark")).toBeDefined();
      expect(
        screen.getByTestId(`found-character-${character.character.name}`),
      ).toBeDefined();
    });
  });

  test("shows game end modal when all characters are found", async () => {
    const user = userEvent.setup();
    renderComponent();

    await openGameStartModal(user);
    await clickStartGame(user);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Quit" })).toBeDefined();
    });

    mockGameDetails.characters.forEach((character) => {
      clickCharacter(character);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Congratulations" }),
      ).toBeDefined();
      expect(screen.getByRole("button", { name: "Play Again" })).toBeDefined();
      expect(screen.getByRole("link", { name: "Next Game" })).toBeDefined();
    });
  });

  test("restarts game when play again button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await openGameStartModal(user);
    await clickStartGame(user);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Quit" })).toBeDefined();
    });

    mockGameDetails.characters.forEach((character) => {
      clickCharacter(character);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Congratulations" }),
      ).toBeDefined();
    });

    const playAgainButton = screen.getByRole("button", { name: "Play Again" });
    await user.click(playAgainButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "Congratulations" }),
      ).toBeNull();
      expect(screen.queryByTestId("game-mark")).toBeNull();
      expect(screen.getByRole("button", { name: "Quit" })).toBeDefined();

      const timeDisplay = screen.getByTestId("game-time");
      expect(timeDisplay.textContent).toMatch(/^0:00/);
    });
  });
});

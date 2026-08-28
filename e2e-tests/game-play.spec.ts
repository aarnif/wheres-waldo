import { expect } from "@playwright/test";
import { test } from "./fixtures";
import {
  assertGameCards,
  assertGameCharacters,
  clickCharacter,
  startGame,
} from "./helpers/funcs";

test.describe("Game Play", () => {
  test.beforeEach(async ({ page, games }) => {
    await assertGameCards(page, games);
  });

  test.describe("Start", () => {
    test("navigates to game preview when game card is clicked", async ({
      page,
      gameDetails,
    }) => {
      const {
        id,
        description,
        title,
        difficulty,
        characters: gameCharacters,
      } = gameDetails;
      await page.getByTestId(`game-card-${id}`).click();

      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(
        page.getByText(difficulty[0].toUpperCase() + difficulty.slice(1)),
      ).toBeVisible();
      await expect(page.getByText(description)).toBeVisible();

      await assertGameCharacters(page, gameCharacters);

      await expect(page.getByRole("link", { name: "Go Back" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Play Game" }),
      ).toBeVisible();
    });

    test("shows game start modal when play game button is clicked", async ({
      page,
      gameDetails,
    }) => {
      const { id, title, characters: gameCharacters } = gameDetails;
      await page.getByTestId(`game-card-${id}`).click();
      await page.getByRole("button", { name: "Play Game" }).click();

      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(
        page.getByText("Find and click on each character in the image"),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Let's Play" }),
      ).toBeVisible();

      await assertGameCharacters(page, gameCharacters);
    });

    test("shows game preview when cancel button is clicked", async ({
      page,
      gameDetails,
    }) => {
      const {
        id,
        title,
        description,
        difficulty,
        characters: gameCharacters,
      } = gameDetails;
      await page.getByTestId(`game-card-${id}`).click();
      await page.getByRole("button", { name: "Play Game" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();

      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(
        page.getByText(difficulty[0].toUpperCase() + difficulty.slice(1)),
      ).toBeVisible();
      await expect(page.getByText(description)).toBeVisible();

      await assertGameCharacters(page, gameCharacters);

      await expect(page.getByRole("link", { name: "Go Back" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Play Game" }),
      ).toBeVisible();
    });
  });

  test.describe("Playing", () => {
    test.beforeEach(async ({ page, gameDetails }) => {
      await startGame(page, gameDetails.id);
    });

    test("starts the game when let's play button is clicked", async ({
      page,
      gameDetails,
    }) => {
      const { title } = gameDetails;

      await expect(
        page.getByText("Find and click on each character in the image"),
      ).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Cancel" })).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Let's Play" }),
      ).toHaveCount(0);

      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(page.getByRole("button", { name: "Quit" })).toBeVisible();
      await expect(page.getByTestId("game-time")).toHaveText(/^0:00/);
    });

    test("shows game preview when quit button is clicked", async ({
      page,
      gameDetails,
    }) => {
      await page.getByRole("button", { name: "Quit" }).click();

      const {
        title,
        description,
        difficulty,
        characters: gameCharacters,
      } = gameDetails;

      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      await expect(
        page.getByText(difficulty[0].toUpperCase() + difficulty.slice(1)),
      ).toBeVisible();
      await expect(page.getByText(description)).toBeVisible();

      await assertGameCharacters(page, gameCharacters);

      await expect(page.getByRole("link", { name: "Go Back" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Play Game" }),
      ).toBeVisible();
    });

    test("marks a character as found when clicked on the canvas", async ({
      page,
      gameDetails,
    }) => {
      const [firstCharacter] = gameDetails.characters;

      if (!firstCharacter) {
        throw new Error("The game has no characters");
      }

      const { character } = firstCharacter;

      await clickCharacter(page, firstCharacter);

      await expect(page.getByTestId("game-mark")).toBeVisible();
      await expect(
        page.getByTestId(`found-character-${character.name}`),
      ).toBeVisible();
      await expect(
        page.getByText(`You found ${character.displayName}!`),
      ).toBeVisible();
    });

    test("shows the end modal when all characters are found", async ({
      page,
      gameDetails,
    }) => {
      for (const character of gameDetails.characters) {
        await clickCharacter(page, character);
      }

      await expect(
        page.getByRole("heading", { name: "Congratulations" }),
      ).toBeVisible();
      await expect(page.getByText("You found all characters!")).toBeVisible();
      await expect(page.getByText("Your time was:")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Play Again" }),
      ).toBeVisible();
      await expect(page.getByRole("link", { name: "Next Game" })).toBeVisible();
    });

    test("restarts the game when play again button is clicked", async ({
      page,
      gameDetails,
    }) => {
      for (const character of gameDetails.characters) {
        await clickCharacter(page, character);
      }
      await expect(
        page.getByRole("heading", { name: "Congratulations" }),
      ).toBeVisible();

      await page.getByRole("button", { name: "Play Again" }).click();

      await expect(
        page.getByRole("heading", { name: "Congratulations" }),
      ).not.toBeVisible();
      await expect(page.getByTestId("game-mark")).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Quit" })).toBeVisible();
      await expect(page.getByTestId("game-time")).toHaveText(/^0:00/);
    });

    test("returns to home page when next game link is clicked", async ({
      page,
      games,
      gameDetails,
    }) => {
      for (const character of gameDetails.characters) {
        await clickCharacter(page, character);
      }
      await expect(
        page.getByRole("heading", { name: "Congratulations" }),
      ).toBeVisible();

      await page.getByRole("link", { name: "Next Game" }).click();

      await assertGameCards(page, games);
    });
  });
});

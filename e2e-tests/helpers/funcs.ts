import { expect, type Page, type APIRequestContext } from "@playwright/test";
import type {
  SignUpCredentials,
  LoginCredentials,
  Game,
  GameDetails,
  GameCharacter,
} from "../../frontend/src/types";

export const getGamesViaApi = async (
  request: APIRequestContext,
): Promise<Game[]> => {
  const response = await request.get("http://localhost:3000/api/games");
  if (!response.ok()) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};

export const getGameDetailsViaApi = async (
  request: APIRequestContext,
  id: number,
): Promise<GameDetails> => {
  const response = await request.get(`http://localhost:3000/api/games/${id}`);
  if (!response.ok()) {
    throw new Error(`Failed to fetch game with id ${id}`);
  }
  return response.json();
};

export const createUserViaApi = async (
  request: APIRequestContext,
  credentials: SignUpCredentials,
) => {
  const response = await request.post("http://localhost:3000/api/users", {
    data: credentials,
  });

  const body = await response.json();

  if (!response.ok()) {
    let message = "Failed to create user";

    if (body.errors) {
      message = body.errors
        .map((error: { message: string }) => error.message)
        .join(", ");
    } else if (body.error) {
      message = body.error;
    }

    throw new Error(message);
  }

  return body;
};

export const signUp = async (page: Page, credentials: SignUpCredentials) => {
  await page.getByRole("link", { name: "Sign Up" }).click();

  const { username, password, confirmPassword } = credentials;

  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("ConfirmPassword").fill(confirmPassword);

  await page.getByRole("button", { name: "Sign Up" }).click();
};

export const logIn = async (page: Page, credentials: LoginCredentials) => {
  await page.getByRole("button", { name: "Log In" }).click();

  const { username, password } = credentials;

  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);

  await page.getByTestId("login-submit-button").click();
};

export const assertErrorNotifyAndClose = async (
  page: Page,
  message: string,
) => {
  await expect(page.getByText(message)).toBeVisible();
  await page.getByTestId("close-notify-message").click();
  await expect(page.getByText(message)).not.toBeVisible();
};

export const assertGameCards = async (page: Page, games: Game[]) => {
  for (const game of games) {
    await expect(page.getByRole("img", { name: game.title })).toBeVisible();
    await expect(page.getByRole("heading", { name: game.title })).toBeVisible();
  }
};

export const assertGameCharacters = async (
  page: Page,
  gameCharacters: GameCharacter[],
) => {
  for (const { character } of gameCharacters) {
    await expect(
      page.getByText(character.displayName, { exact: true }),
    ).toBeVisible();
  }
};

export const startGame = async (page: Page, gameId: number) => {
  await page.getByTestId(`game-card-${gameId}`).click();
  await page.getByRole("button", { name: "Play Game" }).click();
  await page.getByRole("button", { name: "Let's Play" }).click();
};

export const clickCharacter = async (page: Page, character: GameCharacter) => {
  const canvas = page.getByTestId("game-canvas");
  await expect(canvas).toBeVisible();

  const box = await canvas.boundingBox();
  if (!box) {
    throw new Error("game-canvas not found or not visible");
  }

  const { x, y, width, height } = character;
  await canvas.click({
    position: {
      x: (x + width / 2) * box.width,
      y: (y + height / 2) * box.height,
    },
  });
};

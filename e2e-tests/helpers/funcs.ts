import { expect, type Page, type APIRequestContext } from "@playwright/test";
import type {
  SignUpCredentials,
  LoginCredentials,
  LoginResponse,
  Game,
  GameDetails,
  GameCharacter,
  GameScore,
  LeaderboardEntry,
  User,
} from "../../frontend/src/types";
import { formatTime } from "../../frontend/src/helpers/time";
import { GAME_SCORES_KEY } from "../../frontend/src/helpers/localGameScores";

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

export const addGameScoreViaApi = async (
  request: APIRequestContext,
  token: string,
  gameId: number,
  time: number,
): Promise<GameScore> => {
  const response = await request.post(
    `http://localhost:3000/api/games/${gameId}/scores`,
    {
      headers: { Authorization: `Bearer ${token}` },
      data: { time },
    },
  );

  const body = await response.json();

  if (!response.ok()) {
    let message = "Failed to add game score";

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

export const logInViaApi = async (
  request: APIRequestContext,
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await request.post("http://localhost:3000/api/users/login", {
    data: credentials,
  });

  const body = await response.json();

  if (!response.ok) {
    let message = "Failed to login";

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

export const createPlayerWithScoreViaApi = async (
  request: APIRequestContext,
  credentials: SignUpCredentials,
  gameId: number,
  time: number,
): Promise<LeaderboardEntry> => {
  const user: User = await createUserViaApi(request, credentials);
  const { token } = await logInViaApi(request, credentials);
  const score = await addGameScoreViaApi(request, token, gameId, time);

  return { ...score, user };
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

export const assertNotificationAndClose = async (
  page: Page,
  type: "success" | "error",
  message: string,
) => {
  const notification = page
    .getByTestId(`notification-${type}`)
    .filter({ hasText: message });

  await expect(notification).toBeVisible();
  await notification.getByTestId("notification-close-button").click();
  await expect(notification).not.toBeVisible();
};

export const assertGameCards = async (page: Page, games: Game[]) => {
  for (const game of games) {
    await expect(page.getByRole("img", { name: game.title })).toBeVisible();
    await expect(page.getByRole("heading", { name: game.title })).toBeVisible();
  }
};

export const assertLeaderboardEntries = async (
  page: Page,
  gameId: number,
  entries: LeaderboardEntry[],
  currentUsername?: string,
) => {
  const topFiveEntries = entries.slice(0, 5);
  const gameCard = page.getByTestId(`game-card-${gameId}`);
  const listItems = gameCard.getByRole("listitem");

  const currentUserIndex = currentUsername
    ? entries.findIndex((entry) => entry.user.username === currentUsername)
    : -1;

  if (currentUsername && currentUserIndex === -1) {
    throw new Error("Current user time not found in leaderboard entries");
  }

  const outsideTopFive = currentUserIndex >= 5;

  await expect(listItems).toHaveCount(
    topFiveEntries.length + (outsideTopFive ? 2 : 0),
  );

  for (const [index, entry] of topFiveEntries.entries()) {
    const listItem = listItems.nth(index);

    await expect(
      listItem.getByText(`${index + 1}.`, { exact: true }),
    ).toBeVisible();
    await expect(
      listItem.getByText(entry.user.username, { exact: true }),
    ).toBeVisible();
    await expect(
      listItem.getByText(formatTime(entry.time), { exact: true }),
    ).toBeVisible();
  }

  if (outsideTopFive) {
    const { time } = entries[currentUserIndex];
    const currentUserEntry = gameCard.getByTestId("leaderboard-current-user");

    await expect(gameCard.getByTestId("leaderboard-divider")).toBeVisible();
    await expect(
      currentUserEntry.getByText(`${currentUserIndex + 1}.`, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      currentUserEntry.getByText(currentUsername!, { exact: true }),
    ).toBeVisible();
    await expect(
      currentUserEntry.getByText(formatTime(time), {
        exact: true,
      }),
    ).toBeVisible();
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

  await page
    .getByTestId("character-menu")
    .getByRole("button", { name: character.character.displayName })
    .click();
};

export const setLocalGameScore = async (
  page: Page,
  gameId: number,
  time: number,
) => {
  await page.evaluate(
    async ({ key, gameId, time }) => {
      localStorage.setItem(key, JSON.stringify([{ id: gameId, time }]));
    },
    { key: GAME_SCORES_KEY, gameId, time },
  );
};

export const getLocalGameScoresCount = async (page: Page): Promise<number> => {
  return page.evaluate(async (key) => {
    return JSON.parse(localStorage.getItem(key) || "[]").length;
  }, GAME_SCORES_KEY);
};

export const saveScores = async (page: Page) => {
  await expect(page.getByText("Save your scores?")).toBeVisible();
  await page.getByRole("button", { name: "Save Scores" }).click();
};

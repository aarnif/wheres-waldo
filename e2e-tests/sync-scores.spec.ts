import { expect } from "@playwright/test";
import { test } from "./fixtures";
import type { Game } from "../frontend/src/types";
import { formatTime } from "../frontend/src/helpers/time";
import { player1 } from "./helpers/data";
import {
  assertGameCards,
  assertNotificationAndClose,
  createUserViaApi,
  getLocalGameScoresCount,
  logIn,
  saveScores,
  setLocalGameScore,
  signUp,
} from "./helpers/funcs";

test.describe("Sync Scores", () => {
  let game: Game;
  const time = 45000;

  test.beforeEach(async ({ page, games }) => {
    await assertGameCards(page, games);

    [game] = games;
    await setLocalGameScore(page, game.id, time);
  });

  test("syncs local scores when signing up", async ({ page }) => {
    await signUp(page, player1);
    await saveScores(page);

    await assertNotificationAndClose(
      page,
      "success",
      "Scores saved successfully!",
    );
    await expect(page.getByText("Save your scores?")).not.toBeVisible();
    await expect(
      page.getByTestId(`game-card-${game.id}`).getByTestId("user-game-time"),
    ).toHaveText(formatTime(time));

    expect(await getLocalGameScoresCount(page)).toBe(0);
  });

  test("syncs local scores when logging in", async ({ page, request }) => {
    await createUserViaApi(request, player1);
    await logIn(page, player1);
    await saveScores(page);

    await assertNotificationAndClose(
      page,
      "success",
      "Scores saved successfully!",
    );
    await expect(page.getByText("Save your scores?")).not.toBeVisible();
    await expect(
      page.getByTestId(`game-card-${game.id}`).getByTestId("user-game-time"),
    ).toHaveText(formatTime(time));

    expect(await getLocalGameScoresCount(page)).toBe(0);
  });

  test("keeps local scores when the sync prompt is dismissed", async ({
    page,
    request,
  }) => {
    await createUserViaApi(request, player1);
    await logIn(page, player1);

    await expect(page.getByText("Save your scores?")).toBeVisible();
    await page.getByRole("button", { name: "Not Now" }).click();

    await expect(page.getByText("Save your scores?")).not.toBeVisible();
    await expect(
      page.getByTestId(`game-card-${game.id}`).getByTestId("user-game-time"),
    ).not.toBeVisible();

    expect(await getLocalGameScoresCount(page)).toBe(1);
  });
});

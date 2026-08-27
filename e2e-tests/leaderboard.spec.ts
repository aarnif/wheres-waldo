import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { players } from "./helpers/data";
import {
  assertGameCards,
  assertLeaderboardEntries,
  createPlayerWithScoreViaApi,
  logIn,
} from "./helpers/funcs";

test.describe("Leaderboard", () => {
  test.beforeEach(async ({ page, games }) => {
    await assertGameCards(page, games);
  });

  test("shows ranked leaderboard entries with the current user's entry", async ({
    page,
    games,
    request,
  }) => {
    const [game] = games;
    const times = [20000, 30000, 40000, 50000, 60000, 70000];
    const lastPlayer = players[players.length - 1];

    const entries = await Promise.all(
      players.map((player, index) =>
        createPlayerWithScoreViaApi(request, player, game.id, times[index]),
      ),
    );

    await logIn(page, lastPlayer);
    await expect(page.getByTestId("current-user")).toHaveText(
      lastPlayer.username,
    );

    await page.reload();
    await assertGameCards(page, games);
    await assertLeaderboardEntries(page, game.id, entries, lastPlayer.username);
  });

  test("toggles between games and leaderboard", async ({ page, games }) => {
    const [game] = games;
    const flippedCard = page.getByTestId(`game-card-${game.id}-flipped`);

    await page.getByRole("button", { name: "Leaderboard" }).click();
    await expect(flippedCard).toBeVisible();
    await page.getByRole("button", { name: "Games" }).click();
    await expect(flippedCard).not.toBeVisible();
  });
});

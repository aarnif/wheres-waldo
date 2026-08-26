import { test as base } from "@playwright/test";
import type { Game, GameDetails } from "../frontend/src/types";
import { getGameDetailsViaApi, getGamesViaApi } from "./helpers/funcs";

export const test = base.extend<{
  forEachTest: void;
  games: Game[];
  gameDetails: GameDetails;
}>({
  forEachTest: [
    async ({ page, request }, use) => {
      const response = await request.post(
        "http://localhost:3000/api/testing/reset",
      );

      const body = await response.json();

      if (!response.ok()) {
        throw new Error(body.message);
      }

      await page.goto("/");
      await use();
    },
    { auto: true },
  ],
  games: async ({ request }, use) => {
    await use(await getGamesViaApi(request));
  },
  gameDetails: async ({ games, request }, use) => {
    const [game] = games;

    if (!game) {
      throw new Error("No games were returned by the API");
    }

    await use(await getGameDetailsViaApi(request, game.id));
  },
});

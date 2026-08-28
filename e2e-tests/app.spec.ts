import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("App", () => {
  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Where's Waldo/);
  });
});

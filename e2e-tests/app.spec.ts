import { test, expect } from "@playwright/test";

test.describe("App", () => {
  test("has correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Where's Waldo/);
  });
});

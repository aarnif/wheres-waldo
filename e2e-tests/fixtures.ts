import { test as base } from "@playwright/test";

export const test = base.extend<{ forEachTest: void }>({
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
});

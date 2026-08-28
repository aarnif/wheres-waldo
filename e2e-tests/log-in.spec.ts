import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { player1 } from "./helpers/data";
import {
  logIn,
  createUserViaApi,
  assertErrorNotifyAndClose,
  assertNotificationAndClose,
} from "./helpers/funcs";

test.describe("Log In", () => {
  test("prevents login with empty fields", async ({ page }) => {
    await logIn(page, { username: "", password: "" });
    await assertErrorNotifyAndClose(page, "Please fill all fields");
  });

  test("prevents login with invalid username", async ({ page }) => {
    await logIn(page, { username: "invalid", password: player1.password });
    await assertErrorNotifyAndClose(page, "Invalid username or password");
  });

  test("prevents login with invalid password", async ({ page, request }) => {
    await createUserViaApi(request, player1);
    await logIn(page, { username: player1.username, password: "invalid" });
    await assertErrorNotifyAndClose(page, "Invalid username or password");
  });

  test("logs in with valid credentials", async ({ page, request }) => {
    await createUserViaApi(request, player1);
    await logIn(page, {
      username: player1.username,
      password: player1.password,
    });
    await expect(
      page.getByTestId("current-user").getByText(player1.username),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
    await assertNotificationAndClose(
      page,
      "success",
      `Welcome back, ${player1.username}!`,
    );
  });

  test("logs out when log out button is clicked", async ({ page, request }) => {
    await createUserViaApi(request, player1);
    await logIn(page, {
      username: player1.username,
      password: player1.password,
    });

    const logOutButton = page.getByRole("button", { name: "Log Out" });
    await expect(logOutButton).toBeVisible();

    await logOutButton.click();

    await assertNotificationAndClose(
      page,
      "success",
      "You have been logged out",
    );
    await expect(page.getByTestId("current-user")).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign Up" })).toBeVisible();
  });
});

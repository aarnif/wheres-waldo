import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { player1 } from "./helpers/data";
import {
  signUp,
  assertErrorNotifyAndClose,
  assertNotificationAndClose,
  createUserViaApi,
} from "./helpers/funcs";

test.describe("Sign Up", () => {
  test("prevents sign-up with empty fields", async ({ page }) => {
    await signUp(page, { username: "", password: "", confirmPassword: "" });
    await assertErrorNotifyAndClose(page, "Please fill all fields");
  });

  test("prevents sign-up with an invalid username", async ({ page }) => {
    await signUp(page, {
      ...player1,
      username: "Pl",
    });
    await assertErrorNotifyAndClose(
      page,
      "Username must be at least 3 characters long",
    );
  });

  test("prevents sign-up with an invalid password", async ({ page }) => {
    await signUp(page, {
      ...player1,
      password: "passw",
      confirmPassword: "passw",
    });
    await assertErrorNotifyAndClose(
      page,
      "Password must be at least 6 characters long",
    );
  });

  test("prevents sign-up when passwords do not match", async ({ page }) => {
    await signUp(page, {
      ...player1,
      confirmPassword: "different-password",
    });
    await assertErrorNotifyAndClose(page, "Passwords do not match");
  });

  test("signs up with valid credentials", async ({ page }) => {
    await signUp(page, player1);
    await expect(
      page.getByTestId("current-user").getByText(player1.username),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
    await assertNotificationAndClose(
      page,
      "success",
      `Account created for ${player1.username}!`,
    );
  });

  test("prevents sign-up with an existing username", async ({
    page,
    request,
  }) => {
    await createUserViaApi(request, player1);
    await signUp(page, player1);
    await assertErrorNotifyAndClose(page, "Username already exists");
  });
});

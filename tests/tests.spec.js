import { test, expect } from "@playwright/test";

const userCredentials = {
  username: "test",
  password: "password",
  confirmPassword: "password",
};

const typeCredentials = async (
  page,
  username,
  password,
  confirmPassword = null
) => {
  const usernameInput = await page.getByTestId("username-input");
  await usernameInput.fill(username);

  const passwordInput = await page.getByTestId("password-input");
  await passwordInput.fill(password);

  if (confirmPassword) {
    const confirmPasswordInput = await page.getByTestId(
      "confirm-password-input"
    );
    await confirmPasswordInput.fill(confirmPassword);
  }
};

test.describe("Wheres Waldo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("web page has a header", async ({ page }) => {
    await expect(page).toHaveTitle(/Where's Waldo/);
  });

  test("Sign up with a new user", async ({ page, request }) => {
    await request.post("http://localhost:5000/api/testing/reset");
    const signUpButton = await page.getByTestId("sign-up-button");
    await signUpButton.click();

    await typeCredentials(
      page,
      userCredentials.username,
      userCredentials.password,
      userCredentials.confirmPassword
    );

    const signUpSubmitButton = await page.getByTestId("sign-up-submit-button");
    await signUpSubmitButton.click();

    await expect(page.getByText("test")).toBeVisible();
  });

  test("Sign in works with new user", async ({ page }) => {
    await typeCredentials(
      page,
      userCredentials.username,
      userCredentials.password
    );

    const signInButton = await page.getByTestId("sign-in-button");
    await signInButton.click();

    await expect(page.getByText("test")).toBeVisible();
  });

  test("Sign out works", async ({ page }) => {
    await typeCredentials(
      page,
      userCredentials.username,
      userCredentials.password
    );

    const signInButton = await page.getByTestId("sign-in-button");
    await signInButton.click();

    await expect(page.getByText("test")).toBeVisible();

    const signOutButton = await page.getByTestId("desktop-sign-out-button");
    await signOutButton.click();

    await expect(page.getByTestId("sign-in-button")).toBeVisible();
  });

  test("Sign in fails with wrong credentials", async ({ page }) => {
    await typeCredentials(page, userCredentials.username, "wrongpassword");

    const signInButton = await page.getByTestId("sign-in-button");
    await signInButton.click();

    await expect(page.getByText("invalid username or password!")).toBeVisible();
  });
});

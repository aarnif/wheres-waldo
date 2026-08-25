import { expect, type Page, type APIRequestContext } from "@playwright/test";
import { SignUpCredentials } from "../../frontend/src/types";

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

export const signUp = async (page: Page, credentials: SignUpCredentials) => {
  await page.getByRole("link", { name: "Sign Up" }).click();

  const { username, password, confirmPassword } = credentials;

  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("ConfirmPassword").fill(confirmPassword);

  await page.getByRole("button", { name: "Sign Up" }).click();
};

export const assertErrorNotifyAndClose = async (
  page: Page,
  message: string,
) => {
  await expect(page.getByText(message)).toBeVisible();
  await page.getByTestId("close-notify-message").click();
  await expect(page.getByText(message)).not.toBeVisible();
};

import { BASE_URL } from "../../config.ts";
import type { SignUpCredentials, User } from "../types.ts";

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const body = await response.json();

  if (!response.ok) {
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

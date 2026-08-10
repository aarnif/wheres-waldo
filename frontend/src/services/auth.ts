import { BASE_URL } from "../../config.ts";
import type { LoginCredentials, LoginResponse } from "../types.ts";

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const body = await response.json();

  if (!response.ok) {
    let message = "Failed to login";

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

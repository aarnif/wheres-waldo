import { z } from "zod";

export const newUserInputSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginInputSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
});

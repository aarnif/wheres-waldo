import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { vi, describe, expect, test } from "vitest";
import type { SignUpCredentials } from "../types";
import AuthProvider from "../components/AuthProvider";
import Signup from "../pages/Signup";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../services/users", () => ({
  signUp: vi.fn(),
}));

vi.mock("../services/auth", () => ({
  login: vi.fn(),
}));

vi.mock("../helpers/token", () => ({
  getToken: vi.fn(),
  setToken: vi.fn(),
  clearToken: vi.fn(),
}));

vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(() => ({ id: 1, username: "test" })),
}));

const renderComponent = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/signup"]}>
        <Signup />
      </MemoryRouter>
    </AuthProvider>,
  );

const fillSignUpForm = async (
  user: UserEvent,
  credentials: SignUpCredentials,
) => {
  const signUpForm = screen.getByTestId("sign-up-form");
  const usernameInput = within(signUpForm).getByLabelText("Username");
  const passwordInput = within(signUpForm).getByLabelText("Password");
  const confirmPasswordInput =
    within(signUpForm).getByLabelText("ConfirmPassword");

  const { username, password, confirmPassword } = credentials;

  await user.type(usernameInput, username);
  await user.type(passwordInput, password);
  await user.type(confirmPasswordInput, confirmPassword);
};

describe("<Signup />", () => {
  test("renders component with sign up form", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Where's Waldo" }),
      ).toBeDefined();
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
      expect(screen.getByRole("link", { name: "Cancel" })).toBeDefined();
      expect(screen.getByRole("button", { name: "Sign Up" })).toBeDefined();
    });
  });

  test("displays error if inputs fields are empty", async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
    });

    const submitButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please fill all fields")).toBeDefined();
    });
  });

  test("displays error if username is too short", async () => {
    const { signUp } = await import("../services/users");
    vi.mocked(signUp).mockRejectedValue(
      new Error("Username must be at least 3 characters long"),
    );

    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
    });

    await fillSignUpForm(user, {
      username: "te",
      password: "password",
      confirmPassword: "password",
    });

    const submitButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Username must be at least 3 characters long"),
      ).toBeDefined();
    });
  });

  test("displays error if password is too short", async () => {
    const { signUp } = await import("../services/users");
    vi.mocked(signUp).mockRejectedValue(
      new Error("Password must be at least 6 characters long"),
    );

    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
    });

    await fillSignUpForm(user, {
      username: "test",
      password: "pass",
      confirmPassword: "pass",
    });

    const submitButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters long"),
      ).toBeDefined();
    });
  });

  test("displays error if passwords do not match", async () => {
    const { signUp } = await import("../services/users");
    vi.mocked(signUp).mockRejectedValue(new Error("Passwords do not match"));

    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
    });

    await fillSignUpForm(user, {
      username: "test",
      password: "password",
      confirmPassword: "differentPassword",
    });

    const submitButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeDefined();
    });
  });

  test("signs up and logs in with correct credentials when submitted", async () => {
    const { signUp } = await import("../services/users");
    vi.mocked(signUp).mockResolvedValue({
      id: 1,
      username: "test",
    });
    const { login } = await import("../services/auth");
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Sign Up" })).toBeDefined();
    });

    await fillSignUpForm(user, {
      username: "test",
      password: "password",
      confirmPassword: "password",
    });

    const submitButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    await user.click(submitButton);

    expect(signUp).toHaveBeenCalledWith({
      username: "test",
      password: "password",
      confirmPassword: "password",
    });

    expect(login).toHaveBeenCalledWith({
      username: "test",
      password: "password",
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

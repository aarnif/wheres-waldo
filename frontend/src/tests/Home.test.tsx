import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { vi, describe, expect, test, beforeEach } from "vitest";
import type { LoginCredentials } from "../types";
import AuthProvider from "../components/AuthProvider";
import Home from "../pages/Home";
import { mockGames } from "./mocks/games";
import { formatTime } from "../helpers/time";

vi.mock("../services/games", () => ({
  getGames: vi.fn(),
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
  jwtDecode: vi.fn(() => ({ id: 1, username: "Player1" })),
}));

const renderComponent = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    </AuthProvider>,
  );

const openLoginModal = async (user: UserEvent) => {
  const loginButton = screen.getByRole("button", { name: "Log In" });

  await waitFor(() => {
    expect(loginButton).toBeDefined();
  });

  await user.click(loginButton);

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "Log In" })).toBeDefined();
  });
};

const fillLoginForm = async (
  user: UserEvent,
  credentials: LoginCredentials,
) => {
  const loginForm = screen.getByTestId("login-form");
  const usernameInput = within(loginForm).getByLabelText("Username");
  const passwordInput = within(loginForm).getByLabelText("Password");

  const { username, password } = credentials;

  await user.type(usernameInput, username);
  await user.type(passwordInput, password);
};

const switchToLeaderboardTab = async (user: UserEvent) => {
  const leaderboardTab = screen.getByRole("button", { name: "Leaderboard" });
  await user.click(leaderboardTab);
};

describe("<Home />", () => {
  beforeEach(async () => {
    const { getGames } = await import("../services/games");
    vi.mocked(getGames).mockResolvedValue(mockGames);
  });

  test("renders component with header and all games", async () => {
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Where's Waldo" }),
      ).toBeDefined();
      expect(screen.getByRole("link", { name: "Sign Up" })).toBeDefined();
      expect(screen.getByRole("button", { name: "Log In" })).toBeDefined();

      mockGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: game.title })).toBeDefined();
      });
    });
  });

  test("opens login modal when log in button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Log In" })).toBeDefined();
    });
  });

  test("closes login modal when close button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);

    const closeButton = screen.getByTestId("login-close-button");

    await waitFor(() => {
      expect(closeButton).toBeDefined();
    });

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Log In" })).toBeNull();
    });
  });

  test("closes login modal when overlay is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);

    const overlay = screen.getByTestId("login-overlay");

    await waitFor(() => {
      expect(overlay).toBeDefined();
    });

    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Log In" })).toBeNull();
    });
  });

  test("displays error if inputs fields are empty", async () => {
    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);

    const loginForm = screen.getByTestId("login-form");

    const submitButton = within(loginForm).getByRole("button", {
      name: "Log In",
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please fill all fields")).toBeDefined();
    });
  });

  test("displays error when login fails with invalid credentials", async () => {
    const { login } = await import("../services/auth");
    vi.mocked(login).mockRejectedValue(
      new Error("Invalid username or password"),
    );

    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);
    await fillLoginForm(user, { username: "wronguser", password: "wrongpass" });

    const loginForm = screen.getByTestId("login-form");
    const submitButton = within(loginForm).getByRole("button", {
      name: "Log In",
    });

    await user.click(submitButton);

    expect(login).toHaveBeenCalledWith({
      username: "wronguser",
      password: "wrongpass",
    });

    await waitFor(() => {
      expect(screen.getByText("Invalid username or password")).toBeDefined();
    });
  });

  test("login form closes with correct credentials when submitted", async () => {
    const { login } = await import("../services/auth");
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);
    await fillLoginForm(user, { username: "Player1", password: "password" });

    const loginForm = screen.getByTestId("login-form");
    const submitButton = within(loginForm).getByRole("button", {
      name: "Log In",
    });

    await user.click(submitButton);

    expect(login).toHaveBeenCalledWith({
      username: "Player1",
      password: "password",
    });

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Log In" })).toBeNull();
      expect(screen.getByText("Player1")).toBeDefined();
    });
  });

  test("logs out when log out button is clicked", async () => {
    const { login } = await import("../services/auth");
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();
    await openLoginModal(user);
    await fillLoginForm(user, { username: "Player1", password: "password" });

    const loginForm = screen.getByTestId("login-form");
    const submitButton = within(loginForm).getByRole("button", {
      name: "Log In",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Player1")).toBeDefined();
    });

    const logoutButton = screen.getByRole("button", { name: "Log Out" });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Log In" })).toBeDefined();
      expect(screen.queryByText("Player1")).toBeNull();
    });
  });

  test("shows leaderboard when leaderboard tab is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      mockGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: game.title })).toBeDefined();
      });
    });

    await switchToLeaderboardTab(user);

    const firstGame = mockGames[0];
    const topScore = firstGame.gameScores[0];
    const gameCard = screen.getByTestId(`game-card-${firstGame.id}`);

    await waitFor(() => {
      expect(within(gameCard).getByText(topScore.user.username)).toBeDefined();
      expect(
        within(gameCard).getByText(formatTime(topScore.time)),
      ).toBeDefined();
    });
  });

  test("shows games when games tab is clicked after viewing leaderboard", async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Leaderboard" })).toBeDefined();
      mockGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: game.title })).toBeDefined();
      });
    });

    await switchToLeaderboardTab(user);

    const firstGame = mockGames[0];
    const topScore = firstGame.gameScores[0];
    const gameCard = screen.getByTestId(`game-card-${firstGame.id}`);

    await waitFor(() => {
      expect(within(gameCard).getByText(topScore.user.username)).toBeDefined();
    });

    const gamesTab = screen.getByRole("button", { name: "Games" });
    await user.click(gamesTab);

    await waitFor(() => {
      mockGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: game.title })).toBeDefined();
      });
    });
  });
});

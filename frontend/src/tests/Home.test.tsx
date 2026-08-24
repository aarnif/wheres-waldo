import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { vi, describe, expect, test, beforeEach } from "vitest";
import type { LoginCredentials } from "../types";
import AuthProvider from "../components/AuthProvider";
import NotificationProvider from "../components/NotificationProvider";
import Home from "../pages/Home";
import { mockGames } from "./mocks/games";
import { formatTime } from "../helpers/time";

vi.mock("../services/games", () => ({
  getGames: vi.fn(),
  syncGameScores: vi.fn(),
}));

vi.mock("../services/auth", () => ({
  login: vi.fn(),
}));

vi.mock("../helpers/localGameScores", () => ({
  getGameScores: vi.fn(),
  clearGameScores: vi.fn(),
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
      <NotificationProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Home />
        </MemoryRouter>
      </NotificationProvider>
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

const loginWithCredentials = async (
  user: UserEvent,
  credentials: LoginCredentials = { username: "Player1", password: "password" },
) => {
  await openLoginModal(user);
  await fillLoginForm(user, credentials);

  const loginForm = screen.getByTestId("login-form");
  const submitButton = within(loginForm).getByRole("button", {
    name: "Log In",
  });
  await user.click(submitButton);
};

const switchToLeaderboardTab = async (user: UserEvent) => {
  const leaderboardTab = screen.getByRole("button", { name: "Leaderboard" });
  await user.click(leaderboardTab);
};

describe("<Home />", () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    const { getGames } = await import("../services/games");
    const { getGameScores } = await import("../helpers/localGameScores");

    vi.mocked(getGames).mockResolvedValue(mockGames);
    vi.mocked(getGameScores).mockReturnValue([]);
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

    await loginWithCredentials(user, {
      username: "wronguser",
      password: "wrongpass",
    });

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

    await loginWithCredentials(user);

    expect(login).toHaveBeenCalledWith({
      username: "Player1",
      password: "password",
    });

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Log In" })).toBeNull();
      const currentUser = screen.getByTestId("current-user");
      expect(currentUser.textContent).toBe("Player1");
      expect(screen.getByText("Welcome back, Player1!")).toBeDefined();
    });

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("Welcome back, Player1!")).toBeNull();
    });
  });

  test("logs out when log out button is clicked", async () => {
    const { login } = await import("../services/auth");
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await waitFor(() => {
      const currentUser = screen.getByTestId("current-user");
      expect(currentUser.textContent).toBe("Player1");
      expect(screen.getByText("Welcome back, Player1!")).toBeDefined();
    });

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("Welcome back, Player1!")).toBeNull();
    });

    const logoutButton = screen.getByRole("button", { name: "Log Out" });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Log In" })).toBeDefined();
      expect(screen.queryByTestId("current-user")).toBeNull();
      expect(screen.getByText("You have been logged out")).toBeDefined();
    });

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("You have been logged out")).toBeNull();
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

  test("shows current user's time on game card front after logging in", async () => {
    const { login } = await import("../services/auth");
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await waitFor(() => {
      mockGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: game.title })).toBeDefined();
      });
    });

    const firstGame = mockGames[0];
    const userEntry = firstGame.gameScores.find(
      (entry) => entry.user.username === "Player1",
    )!;
    const gameCard = screen.getByTestId(`game-card-${firstGame.id}`);

    await waitFor(() => {
      expect(within(gameCard).getByText("Your Time:")).toBeDefined();

      const userGameTimeDisplay =
        within(gameCard).getByTestId("user-game-time");
      expect(userGameTimeDisplay.textContent).toMatch(
        formatTime(userEntry.time),
      );
    });
  });

  test("does not show your time on games the user has not played", async () => {
    const { login } = await import("../services/auth");
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await waitFor(() => {
      mockGames.forEach((game) => {
        expect(screen.getByRole("heading", { name: game.title })).toBeDefined();
      });
    });

    const spaceGame = mockGames.find((game) => game.title === "Space")!;
    const gameCard = screen.getByTestId(`game-card-${spaceGame.id}`);

    await waitFor(() => {
      expect(within(gameCard).queryByText("Your Time:")).toBeNull();
      expect(within(gameCard).queryByTestId("user-game-time")).toBeNull();
    });
  });

  test("shows sync prompt after login when local scores exist", async () => {
    const { getGameScores } = await import("../helpers/localGameScores");
    const { login } = await import("../services/auth");

    vi.mocked(getGameScores).mockReturnValue([{ id: 1, time: 4500 }]);
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await waitFor(() => {
      expect(screen.getByText("Save your scores?")).toBeDefined();
    });
  });

  test("does not show sync prompt after login when no local scores exist", async () => {
    const { getGameScores } = await import("../helpers/localGameScores");
    const { login } = await import("../services/auth");

    vi.mocked(getGameScores).mockReturnValue([]);
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await waitFor(() => {
      const currentUser = screen.getByTestId("current-user");
      expect(currentUser.textContent).toBe("Player1");
    });

    expect(screen.queryByText("Save your scores?")).toBeNull();
  });

  test("syncs and clears local scores when save scores is clicked", async () => {
    const { getGameScores, clearGameScores } =
      await import("../helpers/localGameScores");
    const { syncGameScores } = await import("../services/games");
    const { login } = await import("../services/auth");

    vi.mocked(getGameScores).mockReturnValue([{ id: 1, time: 4500 }]);
    vi.mocked(syncGameScores).mockResolvedValue(undefined);
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("Welcome back, Player1!")).toBeNull();
    });

    await waitFor(() => {
      expect(screen.getByText("Save your scores?")).toBeDefined();
    });

    const saveButton = screen.getByRole("button", { name: "Save Scores" });
    await user.click(saveButton);

    await waitFor(() => {
      expect(syncGameScores).toHaveBeenCalledWith([{ id: 1, time: 4500 }]);
      expect(clearGameScores).toHaveBeenCalled();
      expect(screen.queryByText("Save your scores?")).toBeNull();
      expect(screen.getByText("Scores saved successfully!")).toBeDefined();
    });

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("Scores saved successfully!")).toBeNull();
    });
  });

  test("shows error notification when score sync fails", async () => {
    const { getGameScores } = await import("../helpers/localGameScores");
    const { syncGameScores } = await import("../services/games");
    const { login } = await import("../services/auth");

    vi.mocked(getGameScores).mockReturnValue([{ id: 1, time: 4500 }]);
    vi.mocked(syncGameScores).mockRejectedValue(new Error("Sync failed"));
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("Welcome back, Player1!")).toBeNull();
    });

    await waitFor(() => {
      expect(screen.getByText("Save your scores?")).toBeDefined();
    });

    const saveButton = screen.getByRole("button", { name: "Save Scores" });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Failed to save scores")).toBeDefined();
    });

    await user.click(screen.getByTestId("notification-close-button"));

    await waitFor(() => {
      expect(screen.queryByText("Failed to save scores")).toBeNull();
    });
  });

  test("dismisses sync prompt without syncing when not now is clicked", async () => {
    const { getGameScores, clearGameScores } =
      await import("../helpers/localGameScores");
    const { syncGameScores } = await import("../services/games");
    const { login } = await import("../services/auth");

    vi.mocked(getGameScores).mockReturnValue([{ id: 1, time: 4500 }]);
    vi.mocked(syncGameScores).mockResolvedValue(undefined);
    vi.mocked(login).mockResolvedValue({ token: "mocked-token" });

    const user = userEvent.setup();
    renderComponent();

    await loginWithCredentials(user);

    await waitFor(() => {
      expect(screen.getByText("Save your scores?")).toBeDefined();
    });

    const notNowButton = screen.getByRole("button", { name: "Not Now" });
    await user.click(notNowButton);

    await waitFor(() => {
      expect(screen.queryByText("Save your scores?")).toBeNull();
    });

    expect(syncGameScores).not.toHaveBeenCalled();
    expect(clearGameScores).not.toHaveBeenCalled();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi, describe, expect, test } from "vitest";
import AuthProvider from "../components/AuthProvider";
import Home from "../pages/Home";
import { mockGames } from "./mocks/games";

vi.mock("../services/games", () => ({
  getGames: vi.fn(),
}));

describe("<Home />", () => {
  test("renders component with header and all games", async () => {
    const { getGames } = await import("../services/games");

    vi.mocked(getGames).mockResolvedValue(mockGames);

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Home />
        </MemoryRouter>
      </AuthProvider>,
    );

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
});

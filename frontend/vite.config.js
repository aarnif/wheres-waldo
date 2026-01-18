import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import config from "../config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.VITE_BASE_URL": JSON.stringify(config.VITE_BASE_URL),
  },
  base: "/",
  root: "frontend",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
});

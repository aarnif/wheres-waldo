import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "../backend/utils/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      BASE_URL: config.BASE_URL,
    },
  },
  base: "/",
  root: "frontend",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
});

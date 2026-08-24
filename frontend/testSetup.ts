import "@testing-library/jest-dom/vitest";
import { MotionGlobalConfig } from "motion";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

MotionGlobalConfig.skipAnimations = true;

afterEach(() => {
  cleanup();
});

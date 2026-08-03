import { drizzle } from "drizzle-orm/postgres-js";
import config from "../../config.ts";

export const db = drizzle(config.DATABASE_URL);

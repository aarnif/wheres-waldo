import { drizzle } from "drizzle-orm/postgres-js";
import config from "../../config.ts";
import * as schema from "./schema.ts";

export const db = drizzle(config.DATABASE_URL, { schema });

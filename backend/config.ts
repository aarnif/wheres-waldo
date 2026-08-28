import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL!;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "";
const POPULATE_DB = process.env.POPULATE_DB === "true";
const NODE_ENV = process.env.NODE_ENV || "development";

export default {
  DATABASE_URL,
  PORT,
  JWT_SECRET,
  POPULATE_DB,
  NODE_ENV,
};

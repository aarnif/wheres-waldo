import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL!;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "";

export default {
  DATABASE_URL,
  PORT,
  JWT_SECRET,
};

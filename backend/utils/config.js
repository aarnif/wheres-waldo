import "dotenv/config";

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const BASE_URL =
  process.env.NODE_ENV === "test"
    ? `http://localhost:${PORT}/api`
    : "https://wheres-waldo-api-rln6.onrender.com/api";

export default { MONGODB_URI, SESSION_SECRET, PORT, BASE_URL };

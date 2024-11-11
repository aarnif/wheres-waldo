import "dotenv/config";

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export default { MONGODB_URI, SESSION_SECRET, PORT };

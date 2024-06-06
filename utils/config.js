import "dotenv/config";

const PORT = process.env.PORT || 5000;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGODB_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@cluster0.xorb2be.mongodb.net/database?retryWrites=true&w=majority`;

export default { MONGODB_URI, SESSION_SECRET, PORT };

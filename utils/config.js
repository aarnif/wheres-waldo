import "dotenv/config";

const PORT = process.env.PORT;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@cluster0.xorb2be.mongodb.net/database?retryWrites=true&w=majority`;

export default { MONGO_URI, SESSION_SECRET, PORT };

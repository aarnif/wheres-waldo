import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";
import config from "./utils/config.js";
import errorHandler from "./errorHandler.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(config.MONGO_URI);
}

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(errorHandler);

export default app;

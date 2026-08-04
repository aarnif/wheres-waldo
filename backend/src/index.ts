import app from "./app.ts";
import config from "../config.ts";
import { db } from "./db/index.ts";

const start = async () => {
  await db.execute("select 1");

  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};

start();

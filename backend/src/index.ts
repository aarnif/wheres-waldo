import app from "./app.ts";
import config from "../config.ts";

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

import config from "./config";
import express from "express";
import router from "./routes";
import { requestLogger } from "./middleware/logger";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(genericErrorHandler);
app.use(notFoundError);
app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});

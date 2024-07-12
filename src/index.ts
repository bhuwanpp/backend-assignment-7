import config from "./config";
import express from "express";
import router from "./routes";
import { requestLogger } from "./middleware/logger";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";

const app = express();
const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 20,
  message: "Too many request",
});
app.use(helmet());
app.use(limiter);
const allowedOrigin = ["https://www.test.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  })
);
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(genericErrorHandler);
app.use(notFoundError);
app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});

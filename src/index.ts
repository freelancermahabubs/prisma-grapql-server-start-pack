import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import { UserService } from "./Services/User";
import { PORT } from "./config";
import { createGraphQLSever } from "./graphql";
import winston from "winston";
import expressWinston from "express-winston";
import rateLimiter from "./utils/APIRateLimiter";
import helmet from "helmet";
import serverless from "serverless-http";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(rateLimiter);
app.use(helmet());
app.use(
  expressWinston.logger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: "./logs/error.log",
        level: "error",
      }),
    ],
  })
);

const initSever = async () => {
  app.use(
    "/graphql",
    expressMiddleware(await createGraphQLSever(), {
      context: async ({ req }) => {
        const token = req?.headers?.authorization;
        try {
          if (token && typeof token === "string") {
            const finalToken = token?.split("Bearer ")[1];
            const user = UserService.getUserFromToken(finalToken);
            return user;
          }
          return {};
        } catch (error) {
          return {};
        }
      },
    })
  );
  //uncomment before working with local
  app.listen(PORT, () => {
    console.log(`SoftFixup Backend Running ${PORT}`);
  });
  
  //uncomment before deploy
  // module.exports.handler = serverless(app);
  // console.log("Connected to serverless");
};

initSever();

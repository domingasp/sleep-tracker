import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import routes from "./routes/routes";
import HttpException from "./models/http-exception.model";

const app: Express = express();

/**
 * App Configuration
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "API is running on /api" });
});

app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err && err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    } else if (err instanceof HttpException && err.errorCode) {
      res.status(err.errorCode).json({ msg: err.message });
    } else if (err) {
      res.status(500).json(err.message);
    }
  }
);

export default app;

import express, { Request, Response, NextFunction, Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import routes from "./routes/index";
import { AppError } from "./utils/appError";

/**
 * Handle UnCaught Exception
 */
process.on("uncaughtException", (err) => {
   console.log(err.name, err.message);
   console.log("Uncaught Exception... Shutting down");
   process.exit(1);
});

const app: Application = express();
const address: string = "http://localhost:4000";
const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/", routes);

/**
 * Route Not Found Handler
 */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/**
 * Global Error Handler
 */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
   res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
   });
});

/**
 * Unhandled Rejections
 */
process.on("unhandledRejection", (err: Error) => {
   console.log(err.name, err.message);
   console.log("Unhandled Rejection... Shutting down");
   process.exit(1);
});

app.listen(PORT, function () {
   console.log(`starting app on: ${address}`);
});

export default app;
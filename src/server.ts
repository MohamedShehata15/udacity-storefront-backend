import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";

import routes from "./routes/index";

const app: Application = express();
const address: string = "http://localhost:4000";
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, function () {
   console.log(`starting app on: ${address}`);
});

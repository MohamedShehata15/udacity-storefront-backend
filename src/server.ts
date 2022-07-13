import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";

const app: Application = express();
const address: string = "http://localhost:4000";
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
   res.send("Hello World!");
});

app.listen(PORT, function () {
   console.log(`starting app on: ${address}`);
});

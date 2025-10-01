import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req: Request, res: Response) => {
  res.send("Server is healthy");
});

export default app;

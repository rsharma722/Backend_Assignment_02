import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

import setupSwagger from "../config/swagger";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

app.get("/health", (_req, res) => {
    res.status(200).send("Server is healthy");
});

setupSwagger(app);


app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;

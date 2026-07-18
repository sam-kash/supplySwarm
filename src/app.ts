import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import simulationRoutes from "./routes/sim.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/analyze", simulationRoutes);

export default app;

import { Router } from "express";
import { analyseSupplyChain } from "../controllers/sim.controller";

const router = Router();

router.post("/", analyseSupplyChain);

export default router;

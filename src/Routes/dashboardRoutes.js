
import express from "express";
import authMiddleware from "../Middelwear/authMIddelwear.js";
import { getDashboard } from "../Controllers/dashboardControllers.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboard);

export default router;


import express from "express";
import { registerUser, login } from "../Controllers/authControllers.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", login);

export default router;

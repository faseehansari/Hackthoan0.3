import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/DB.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hackathon API is running",
    });
});
const PORT = process.env.PORT ;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});

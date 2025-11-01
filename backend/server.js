import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import paymentRoutes from "./src/routes/paymentRoutes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/payments",paymentRoutes)

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

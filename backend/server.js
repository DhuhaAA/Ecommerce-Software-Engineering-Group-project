import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import connectDB from "./config/db.js";

// Load environment variables and connect to database
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

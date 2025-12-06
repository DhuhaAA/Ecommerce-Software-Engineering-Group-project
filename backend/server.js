import express from "express";
import dotenv from "dotenv";
import productRoutes from "./src/routes/productRoute.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import cors from "cors";
import connectDB from "./src/config/db.js";

// Load environment variables and connect to database
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ADD THIS - Log all incoming requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// API routes
app.use("/products", productRoutes);
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
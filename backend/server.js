import dotenv from "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./src/routes/productRoute.js";
import paymentRoutes from "./src/routes/productRoute.js";
import cors from "cors";
import connectDB from "./src/config/db.js";

// Load environment variables and connect to database
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// API routes
app.use("/products", productRoutes);
app.use("/payments",paymentRoutes)
// app.use("/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


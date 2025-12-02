import express from "express";
import Product from "../models/productModel.js";
const router = express.Router();

export { router };

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

export default router;
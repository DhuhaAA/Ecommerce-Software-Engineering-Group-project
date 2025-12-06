import express from "express";
import Product from "../models/productModel.js";
import { getAllProducts } from "../controllers/productController.js";
import { getProductsbyID } from "../controllers/productController.js";
const router = express.Router();

export { router };

router.route("/").get(getAllProducts)
router.route("/:id").get(getProductsbyID)



export default router;
import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { getProductsbyID } from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getAllProducts)
router.route("/:id").get(getProductsbyID)



export default router;
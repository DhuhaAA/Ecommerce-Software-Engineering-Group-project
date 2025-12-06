import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.route("/test").get((req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Payment routes are working!" });
});

router.route("/create-checkout-session").post(createCheckoutSession);

export default router;
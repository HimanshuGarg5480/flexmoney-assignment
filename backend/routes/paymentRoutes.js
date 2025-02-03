import express from "express";
import {
  createPayment,
  getAllPayments,
  getPayments,
} from "../controllers/paymentController.js";
import protectRoute, {
  protectRouteForAdmin,
} from "../middleware/protectRoute.js";

const router = express.Router();

// User Signup Route
router.post("/", protectRoute, createPayment);
router.get("/", protectRoute, getPayments);
router.get("/all", protectRouteForAdmin, getAllPayments);

export default router;

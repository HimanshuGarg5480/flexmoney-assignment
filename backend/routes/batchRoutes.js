import express from "express";
import protectRoute, {
  protectRouteForAdmin,
} from "../middleware/protectRoute.js";
import {
  createBatch,
  deleteBatch,
  getBatches,
} from "../controllers/batchController.js";

const router = express.Router();

// User Signup Route
router.post("/create", protectRouteForAdmin, createBatch);

// User Login Route
router.get("/", protectRoute, getBatches);

router.delete("/:id/delete", protectRouteForAdmin, deleteBatch);

export default router;

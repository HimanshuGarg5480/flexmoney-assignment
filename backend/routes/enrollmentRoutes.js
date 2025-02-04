import express from "express";

import protectRoute, {
  protectRouteForAdmin,
} from "../middleware/protectRoute.js";
import {
  enrollUser,
  getAllEnrollments,
  getUserCurrentEnrollment,
  getUserEnrollments,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", protectRoute, enrollUser);
router.get("/", protectRoute, getUserEnrollments);
router.get("/:month/month", protectRoute, getUserCurrentEnrollment);
router.get("/all", protectRouteForAdmin, getAllEnrollments);

export default router;

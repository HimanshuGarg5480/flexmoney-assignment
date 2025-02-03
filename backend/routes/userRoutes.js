import express from "express";
import { authCheck, getUser, login, logout, signup } from "../controllers/userControllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// User Signup Route
router.post("/signup", signup);

// User Login Route
router.post("/login", login);

router.post("/logout", logout);

router.get("/:id/profile", getUser);

router.get("/authcheck", protectRoute, authCheck);


export default router;

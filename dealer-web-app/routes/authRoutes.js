import express from "express";
const authRoutes = express.Router();
import {
  authenticateUser,
  registerUser,
  getUserData,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

authRoutes.route("/").post(registerUser);
authRoutes.route("/login").post(authenticateUser);
authRoutes.get("/me", protect, getUserData);

export default authRoutes;

import express from "express";
const authRoutes = express.Router();
import {
  authenticateUser,
  registerUser,
  logoutUser,
} from "../controllers/authController.js";

// More Clean Way
authRoutes.route("/").post(authenticateUser).post(registerUser);
authRoutes.route("/:id").get(logoutUser);


export default authRoutes;

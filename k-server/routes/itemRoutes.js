import express from "express";
const itemRoutes = express.Router();
import { getItems } from "../controllers/itemController.js";

// More Clean Way
itemRoutes.route("/").get(getItems);

export default itemRoutes;

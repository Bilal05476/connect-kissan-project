import express from "express";
const itemRoutes = express.Router();
import {
  getItems,
  setItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import protect from "../middleware/authMiddleware.js";

// More Clean Way
itemRoutes.route("/").get(protect, getItems).post(protect, setItem);
itemRoutes.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

// Old Way
// itemRoutes.get("/", getItems);
// itemRoutes.post("/", setItem);
// itemRoutes.put("/:id", updateItem);
// itemRoutes.delete("/:id", deleteItem);

export default itemRoutes;

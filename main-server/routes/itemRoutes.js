import express from "express";
const itemRoutes = express.Router();
import {
  getItems,
  getAllItems,
  setItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import protect from "../middleware/authMiddleware.js";


// More Clean Way
itemRoutes
  .route("/")
  .get(protect, getItems)
  .post(protect, setItem);
itemRoutes.route("/:id").put(protect, updateItem).delete(protect, deleteItem);
itemRoutes.route("/all").get(getAllItems);

export default itemRoutes;

import express from "express";
const itemRoutes = express.Router();
import {
  getItems,
  setItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

// More Clean Way
itemRoutes.route("/").get(getItems).post(setItem);
itemRoutes.route("/:id").put(updateItem).delete(deleteItem);

// Old Way
// itemRoutes.get("/", getItems);
// itemRoutes.post("/", setItem);
// itemRoutes.put("/:id", updateItem);
// itemRoutes.delete("/:id", deleteItem);

export default itemRoutes;

import asyncHandler from "express-async-handler";
import Item from "../models/itemSchema.js";

// @desc   Get Items
// @route  GET api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });
  res.status(200).json(items);
});

export { getItems };

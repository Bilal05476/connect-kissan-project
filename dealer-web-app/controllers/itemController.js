import asyncHandler from "express-async-handler";
import Item from "../models/itemSchema.js";

// @desc   Get Items
// @route  GET api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

// @desc   Set Item
// @route  POST api/item
// @access Private
const setItem = asyncHandler(async (req, res) => {
  const { itemName, itemDetails, itemPrice, itemType, itemImg } = req.body;
  if (
    !itemName |
    !itemDetails |
    !itemPrice |
    !itemPrice |
    !itemType |
    !itemImg
  ) {
    res.status(400);
    throw new Error("Please add an item careFully");
  }
  const item = await Item.create({
    itemName,
    itemDetails,
    itemPrice,
    itemType,
    itemImg,
  });
  res.status(200).json(item);
});

// @desc   Update Item
// @route  PUT api/item/:id
// @access Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedItem);
});

// @desc   Delete Items
// @route  DELETE api/item/:id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  await item.remove();
  res.status(200).json({ id: req.params.id });
});

export { getItems, setItem, updateItem, deleteItem };

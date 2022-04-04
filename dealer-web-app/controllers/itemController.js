import asyncHandler from "express-async-handler";

// @desc   Get Items
// @route  GET api/items
// @access Public
const getItems = asyncHandler(async(req, res) => {
  res.status(200).json({ message: "Get Items" });
});

// @desc   Set Item
// @route  POST api/items
// @access Private
const setItem = asyncHandler(async(req, res) => {
  if(!req.body.text){
      res.status(400)
      throw new Error("Please add an Item Details CareFully");
  }
  res.status(200).json({ message: "Set Item" });
});

// @desc   Update Item
// @route  PUT api/items/:id
// @access Private
const updateItem = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `Update Item ${req.params.id}` });
});

// @desc   Delete Items
// @route  DELETE api/items/:id
// @access Private
const deleteItem = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `Delete Item ${req.params.id}` });
});

export { getItems, setItem, updateItem, deleteItem };

import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  itemName: String,
  itemDetail: String,
  itemType: String,
  itemPrice: String,
  userEmail: String,
  itemImg: {
    data: Buffer,
    contentType: String,
  },
});

var Item = mongoose.model("Item", itemSchema);

export default Item;

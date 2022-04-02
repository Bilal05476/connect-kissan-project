import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  userEmail: String,
  userPhone: String,
  itemName: String,
  itemDetails: String,
  itemType: String,
  itemPrice: String,
  itemImg: String
});

var Item = mongoose.model("Item", itemSchema);

export default Item;
// name: String,
// dealer: String,
// email: { type: String, require: true, unique: true },
// phone: String,

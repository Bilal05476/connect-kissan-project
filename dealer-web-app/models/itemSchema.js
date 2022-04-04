import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Please provide item name"],
      unique: [true, "This name item is already exist"],
    },
    itemDetails: {
      type: String,
      required: [true, "Please provide relevant details"],
    },
    itemType: {
      type: String,
      required: [true, "Please provide relevant type"],
    },
    itemPrice: {
      type: String,
      required: [true, "Please provide price"],
    },
    itemImg: {
      type: String,
      required: [true, "Please provide relevant image"],
    },
  },
  {
    timestamps: true,
  }
);

var Item = mongoose.model("Item", itemSchema);

export default Item;
// name: String,
// dealer: String,
// email: { type: String, require: true, unique: true },
// phone: String,

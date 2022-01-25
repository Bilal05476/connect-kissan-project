import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  dealer: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  token: String,
});

var User = mongoose.model("User", userSchema);

export default User;

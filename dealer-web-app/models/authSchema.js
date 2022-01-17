import mongoose from "mongoose";

// const loginSchema = mongoose.Schema({
//   email: String,
//   password: String,
// });
const userSchema = mongoose.Schema({
  name: String,
  dealer: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  token: String,
});

// var Login = mongoose.model("Login", loginSchema);
var User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  phoneNum: String,
  message: String,
});

var Contact = mongoose.model("Contact", contactSchema);

export default Contact;

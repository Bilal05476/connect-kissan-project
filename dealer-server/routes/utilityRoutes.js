import express from "express";
const utilityRoutes = express.Router();
import Contact from "../models/contactSchema.js";
import User from "../models/authSchema.js";

utilityRoutes.get("/", (req, res) => {
  res.json({ message: "Server Started" });
});

utilityRoutes.post("/contact-us", async (req, res) => {
  const { firstName, lastName, emailAddress, message, phoneNum } = req.body;
  await Contact.create({
    firstName,
    lastName,
    emailAddress,
    phoneNum,
    message,
  });

  try {
    res.status(201).redirect("/form-submission");
  } catch (err) {
    res.render("contact");
  }
});

export default utilityRoutes;

import express from "express";
const utilityRoutes = express.Router();
import Contact from "../models/contactSchema.js";
import User from "../models/authSchema.js";

utilityRoutes.get("/", (req, res) => {
  res.render("index");
});

utilityRoutes.get("/dashboard", async (req, res) => {
  // const user = await User.findById(req.user.id);
  res.render("dashboard");
});

utilityRoutes.get("/register", (req, res) => {
  res.render("register");
});

utilityRoutes.get("/login", (req, res) => {
  res.render("login");
});

utilityRoutes.get("/about", (req, res) => {
  res.render("about");
});

utilityRoutes.get("/contact", (req, res) => {
  res.render("contact");
});

utilityRoutes.get("/form-submission", (req, res) => {
  res.render("formSubmission");
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

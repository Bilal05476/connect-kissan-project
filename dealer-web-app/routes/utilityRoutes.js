import express from "express";
const utilityRoutes = express.Router();
import Contact from "../models/contactSchema.js";

utilityRoutes.get("/", (req, res) => {
  res.render("index");
});

utilityRoutes.get("/dashboard", (req, res) => {
  res.render("dashboard");
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
  const userContact = await Contact.create({
    firstName,
    lastName,
    emailAddress,
    phoneNum,
    message,
  });

  try {
    await userContact.save();
    res.status(201).redirect("/form-submission");
  } catch (err) {
    res.render("contact");
  }
});

export default utilityRoutes;

import express from "express";
const utilityRoutes = express.Router();
import Contact from "../models/contactSchema.js";

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


utilityRoutes.get("/", (req, res) => {
  res.render("index");
});
utilityRoutes.get("/contact", (req, res) => {
  res.render("contact");
});
utilityRoutes.get("/about", (req, res) => {
  res.render("about");
});
utilityRoutes.get("/weather", (req, res) => {
  res.render("weather");
});
utilityRoutes.get("/dealers", (req, res) => {
  res.render("dealers");
});
utilityRoutes.get("/machines", (req, res) => {
  res.render("machines");
});
utilityRoutes.get("/crops", (req, res) => {
  res.render("crops");
});
utilityRoutes.get("/advise", (req, res) => {
  res.render("advise");
});
utilityRoutes.get("/mandies", (req, res) => {
  res.render("mandies");
});
utilityRoutes.get("/pesticides", (req, res) => {
  res.render("pesticides");
});
utilityRoutes.get("/library", (req, res) => {
  res.render("library");
});

export default utilityRoutes;

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "config";
import path from "path";
import Contact from "./models/contactSchema.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import hbs from "hbs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const static_path = path.resolve(__dirname, "public");
const template_path = path.resolve(__dirname, "template/views");
const partial_path = path.resolve(__dirname, "template/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = config.get("mongoURI");

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected :) ..."))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 8081;

// set different routes for different pages
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("/dealers", (req, res) => {
  res.render("dealers");
});
app.get("/machines", (req, res) => {
  res.render("machines");
});
app.get("/crops", (req, res) => {
  res.render("crops");
});
app.get("/advise", (req, res) => {
  res.render("advise");
});
app.get("/mandies", (req, res) => {
  res.render("mandies");
});
app.get("/pesticides", (req, res) => {
  res.render("pesticides");
});
app.get("/library", (req, res) => {
  res.render("library");
});

// contact us
app.post("/contact", async (req, res) => {
  const { firstName, lastName, emailAddress, message, phoneNum } = req.body;
  const userContact = new Contact({
    firstName,
    lastName,
    emailAddress,
    phoneNum,
    message,
  });

  try {
    await userContact.save();
    res.status(201).redirect("/contact");
  } 
  catch (err) {
    res.status(409).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});

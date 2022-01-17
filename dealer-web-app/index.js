import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "config";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import auth from "./middleware/auth.js";

import User from "./models/authSchema.js";
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

// token
const TOKEN_KEY = config.get("TOKEN_KEY");

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected :) ..."))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 8080;

// set different routes for different pages
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/dashboard", auth, (req, res) => {
  res.render("dashboard");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Create New User Into Database
app.post("/register", async (req, res) => {
  const { name, email, dealer, password } = req.body;
  try {
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(201).redirect("/login");
    } else {
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // create a new user object with User constructor
      const user = new User({
        name,
        email: email.toLowerCase(),
        dealer,
        password: encryptedPassword,
      });

      // generate token for a new user
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "240h",
      });
      // save user token
      user.token = token;
      await user.save();
      res.status(201).redirect("/dashboard");
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// Login User With Database
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "240h",
      });
      user.token = token;
      res.json({ accessToken: token });
      res.status(201).redirect("/dashboard");
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
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
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

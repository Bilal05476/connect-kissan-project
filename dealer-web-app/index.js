import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "config";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { LocalStorage } from "node-localstorage";
var localStorage = new LocalStorage("./scratch");

import User from "./models/authSchema.js";
import Contact from "./models/contactSchema.js";
import Item from "./models/itemSchema.js";

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

//Routes
import itemRoutes from "./routes/itemRoutes.js";
app.use("/api/items", itemRoutes);

//MiddleWare
import { errorHandler } from "./middleware/errorMiddleware.js";
app.use(errorHandler);

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
  const _token = localStorage.getItem("token");
  if (!_token) {
    res.render("index");
  } else {
    res.redirect("dashboard");
  }
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/register", (req, res) => {
  const _token = localStorage.getItem("token");
  if (!_token) {
    const _error = localStorage.getItem("errorMessage");
    res.render("register", {
      error: {
        message: _error,
      },
    });
  } else {
    res.redirect("dashboard");
  }
});
app.get("/login", (req, res) => {
  const _token = localStorage.getItem("token");
  if (!_token) {
    const _error = localStorage.getItem("errorMessage");
    res.render("login", {
      error: {
        message: _error,
      },
    });
  } else {
    res.redirect("dashboard");
  }
});

app.get("/dashboard", async (req, res, email) => {
  const user = await User.findOne({ email });
  // Create token
  const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
    expiresIn: "240h",
  });
  user.token = token;
  res.render("dashboard", {
    user: {
      token: token,
      userName: user.name,
      userEmail: user.email,
      userDealer: user.dealer,
      userPhone: user.phone,
    },
  });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/logout", (req, res) => {
  localStorage.clear();
  res.render("logout");
});

// Create New User Into Database
app.post("/register", async (req, res) => {
  const { name, email, dealer, password, phone } = req.body;
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
        phone,
        password: encryptedPassword,
      });

      // generate token for a new user
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "240h",
      });

      // save user token
      user.token = token;
      await user.save();
      //Setting localStorage Item
      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userDealer", user.dealer);
      localStorage.setItem("userPhone", user.phone);
      res.status(201).redirect("/dashboard");
    }
  } catch (err) {
    localStorage.setItem("error", err.message);
    res.render("register");
  }
});

// Login User With Database

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).redirect("/dashboard", email);
    }
  } catch (err) {
    console.log("error", err.message);
    res.render("login");
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
    res.render("contact");
  }
});

// Add Item
app.post("/add-item", async (req, res) => {
  const {
    itemName,
    itemDetails,
    itemType,
    itemPrice,
    itemImg,
    userEmail,
    userPhone,
  } = req.body;
  const userItem = new Item({
    userEmail,
    userPhone,
    itemName,
    itemDetails,
    itemType,
    itemPrice,
    itemImg,
  });

  try {
    await userItem.save();
    res.status(201).redirect("/dashboard");
  } catch (err) {
    res.render("dashboard");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});

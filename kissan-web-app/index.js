import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "config";
import path from "path";

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
import utilityRoutes from "./routes/utilityRoutes.js";
app.use("/", utilityRoutes);



app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});

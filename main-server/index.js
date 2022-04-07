import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
// import path from "path";

// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import hbs from "hbs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
app.use(cors());
// const static_path = path.resolve(__dirname, "public");
// const template_path = path.resolve(__dirname, "template/views");
// const partial_path = path.resolve(__dirname, "template/partials");

// app.use(express.static(static_path));
// app.set("view engine", "hbs");
// app.set("views", template_path);
// hbs.registerPartials(partial_path);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Routes
import itemRoutes from "./routes/itemRoutes.js";
app.use("/api/items", itemRoutes);

import authRoutes from "./routes/authRoutes.js";
app.use("/api/user", authRoutes);

import utilityRoutes from "./routes/utilityRoutes.js";
app.use("/", utilityRoutes);

//MiddleWare
import { errorHandler } from "./middleware/errorMiddleware.js";
app.use(errorHandler);

// DB Config
const db = config.get("mongoURI");
// Port Config
const PORT = config.get("PORT");

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected :) ..."))
  .catch((err) => console.log(err.message));


// Server Listen
const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./Routes/router");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function dbConnect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Connected to database");
  });

  db.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
}

dbConnect();

app.use("/api", router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on https://localhost:${port}`);
});

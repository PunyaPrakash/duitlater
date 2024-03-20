const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

async function dbConnect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log(`Mongoose connected to ${process.env.MONGO_URI}`);
  });

  db.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
}

dbConnect();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on https://localhost:${port}`);
});

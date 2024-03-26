const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./Routes/router");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

async function dbConnect() {
  mongoose.connect(process.env.MONGODB_URI, {
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

app.listen(process.env.PORT, () => {
  console.log(`Server started on https://localhost:${process.env.PORT}`);
});

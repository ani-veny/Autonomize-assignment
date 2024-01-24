const mongoose = require("mongoose");
const config = require("./config");
const express = require("express");

const app = require("./app") ;


//Creating the express app
app.use(express.json());

const DB_URI = config.mongoose.url


mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to DB at ", DB_URI))
  .catch(() => console.log("Failed to connect to DB at", DB_URI));
app.listen(`${config.port}`, () => {
  console.log(`App is running on port ${config.port}`);
});
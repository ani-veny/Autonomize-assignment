const express = require("express");
const httpStatus = require("http-status");
const routes = require("./routes/user.route.js");
const app = express();
const cors= require('cors')

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// console.log("This is from App.js User Routes");

app.use("/users", routes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = httpStatus.NOT_FOUND;
    next(error);
});

module.exports = app
const express = require("express");

const app = express();

// auth middleware
const auth = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing  routes moudles
const authRoute = require("./routes/auth/Auth.route");
// user routes
const userRoute = require("./routes/user/User.route");

// public routes

app.use("/api/v1/auth", authRoute);

// private routes

// getting all the logged in user's data
app.use("/api/v1/user", auth, userRoute);

app.get("/api/v1", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

module.exports = app;

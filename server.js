//1. Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");

//import registration model
const Registration = require("./models/Registration")
require("dotenv").config();

//Import routes
const indexRoutes = require("./routes/indexRoute");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const batteryRoutes = require("./routes/batteryRoutes");
//2. Instantiations
const app = express();
const PORT = 3000;

//3. Configurations
//mongodb settings
//setting up database connections
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connnection open");
  })
  .on("error", (err) => {
    console.error(`connection error: ${err.message}`);
  });

//Set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //specifies the views directory

//4. Middleware

// To parse URL encoded data
app.use(express.urlencoded({ extended: false })); //This helpse to parse data from forms.
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(Registration.createStrategy());

passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

//5. Routes
//Using imported routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/", vehicleRoutes);
app.use("/", batteryRoutes);

//Non existant routes regardless of the method used(get, post, delete) will be caught by this middleware
// This will always be the last endpoint in this file
app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

//6.Bootstrapping server
// This should always be the last line in this file
app.listen(PORT, () => console.log(`listening on port ${PORT}`)); // new

//Full route path
//Routepath in the server.js + routepath in the routes file
//For example: Full path for signup route
// /auth/signup
// /auth/login

const express = require("express");
const router = express.Router();

//Import registration model
const Registration = require("../models/Registration");

router.get("/signup", (req, res) => {
  res.render("signUp");
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new Registration(req.body);
    await Registration.register(newUser, (req.body.password));
    console.log("user save")
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error) 
    res.send("Not able to save the user to the database")
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;

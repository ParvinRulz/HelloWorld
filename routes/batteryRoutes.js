const express = require("express");
const router = express.Router();

const Battery = require("../models/Battery_registration");

router.get("/registerBattery", (req, res) => {
  res.render("battery");
});

router.post("/registerBattery", async (req, res) => {
  console.log("reached here");
  try {
    const newBattery = new Battery(req.body);
    console.log(newBattery);
    await newBattery.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("battery");
  }
});

module.exports = router;

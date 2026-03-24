const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle_registration");

router.get("/registerVehicle", (req, res) => {
  res.render("register-vehicle");
});

router.post("/registerVehicle", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    console.log(newVehicle);
    await newVehicle.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("register-vehicle");
  }
});

module.exports = router;

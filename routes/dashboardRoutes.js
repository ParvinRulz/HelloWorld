const express = require("express");
const router = express.Router();
const {isAuthenticated, isAdmin, isManager, isAttendant} = require("../middleware/auth")

//Import models
const Registration = require('../models/Registration')

router.get("/manager", isManager, (req, res) => {
    res.render("managerDashboard");
});

router.get("/admin", isAdmin, (req, res) => {
    res.render("adminDashboard");
});

router.get("/attendant", isAttendant, (req, res) => {
    res.render("attendantDashboard");
});

router.get("/usersList", isAdmin, async (req, res) => {
  try {
    let users = await Registration.find().sort({$natural: -1})
    res.render("usersList", {users});
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})

module.exports = router;
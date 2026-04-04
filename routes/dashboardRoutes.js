const express = require("express");
const router = express.Router();
const {isAuthenticated, isAdmin, isManager, isAttendant} = require("../middleware/auth")

//Import models
const Registration = require('../models/Registration')

router.get("/manager", isManager, (req, res) => {
    res.render("managerDashboard");
});

// router.get("/admin", async (req, res) => {
//   try {
//     //Determine the selected date, default to today if none is provided
//     const queryDate = req.query.date? new Date(req.query.date):new Date();
//     //Create start and end of the selected day for mongodb querying
//     const startOfDay = new Date(queryDate.setHours(0,0,0,0));
//     const endOfDay = new Date(queryDate.setHours(23,59,59,999));
//     //Query signedout vehicles for revenue
//     const signedOutVehicles = await
//   } catch (error) {
//   }
//     res.render("adminDashboard");
// });

router.get("/attendant", isAttendant, async (req, res) => {
  try {
         let cars = await Vehicle.find({status:"Parked"}).sort({$natural:-1})
         res.render("attendantDashboard", {cars});
  } catch (error) {
    
  }
})

router.get("/usersList", isAdmin, async (req, res) => {
  try {
    let users = await Registration.find().sort({$natural: -1})
    res.render("usersList", {users});
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})

module.exports = router;
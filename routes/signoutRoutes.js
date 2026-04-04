const express = require("express");
const router = express.Router();
const calculateParkingFee = require("../utils/feeCalculator");

//Import models
const Vehicle = require("../models/Vehicle_registration")
const SignOut = require("../models/SignOut")

router.get("/signout", (req, res) => {
  res.render("signOut");
});

router.post("/signout/verify", async (req, res) => {
    try {
       const car = await Vehicle.findOne({receiptNumber:req.body.receiptNumber, status:"Parked"})
       if(!car){
        return res.render("signOut")
       }
       const fee = calculateParkingFee(car.vehicleType, car.arrivalTime)
       res.render("signOutConfirm", {car,fee})
    } catch (error) {
        res.render("signOut");
    }
});

router.post("/signout/confirm", async (req, res) => {
    try {
       const newSignout = new SignOut(req.body)
       const savedSignOut =  await newSignout.save();
       await Vehicle.findByIdAndUpdate(req.body.vehicleId,{status: "Signed-out"})
       res.redirect(`/signout/receipt/${savedSignOut._id}`)
    } catch (error) {
        res.status(400).send("Failed to signout a car");
    }
});

router.get("/signout/receipt/:id", async (req, res) => {
    try {
       const record = await SignOut.findById(req.params.id).populate("vehicleId")
       if(!record)
        return res.redirect("/signout")
        res.render("receipt", {record})
    } catch (error) {
        res.render("signOut");
    }
});












module.exports = router;
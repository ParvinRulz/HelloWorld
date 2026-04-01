const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer  = require('multer');
const{ isAttendant} = require("../middleware/auth");

//Import model files
const Vehicle = require("../models/Vehicle_registration");

//Image upload configurations
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })

router.get("/registerVehicle", (req, res) => {
  res.render("register-vehicle");
});

router.post("/registerVehicle", upload.single("vehicleImage"), async (req, res) => {
  try {
    const uniqueTicket = "RCPT-" + crypto.randomBytes(3).toString("hex").toUpperCase();
    const newVehicle = new Vehicle({
     driverName: req.body.driverName,
     phoneNumber: req.body.phoneNumber,
     vehicleType: req.body.vehicleType,
     numberPlate: req.body.numberPlate,
     vehicleModel: req.body.vehicleModel,
     vehicleColor: req.body.vehicleColor,
     ninNumber: req.body.ninNumber,
     arrivalDate: req.body.arrivalDate,
     arrivalTime: req.body.arrivalTime,
     receiptNumber: uniqueTicket,
     vehicleImage: req.file.path
    });
    console.log(newVehicle);
    await newVehicle.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("register-vehicle");
  }
});

//Update vehicle routes
//Show the update form
router.get("/vehicles/update/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if(!car) return res.redirect("/carList")
      res.render("updateVehicle", {car})
  } catch (error) {
    res.status(400).send("Unable to find vehicle in the Database.")
  }
})
router.post("/vehicles/update/:id", async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("carList")
  } catch (error) {
      res.status(400).send("Unable to update car in the Database.")
  }
});
router.post("/vehicles/delete", async (req, res) => {
  try {
    await Vehicle.deleteOne({_id:req.body.id});
    res.redirect("/carList")
  } catch (error) {
    res.status(400).send("Unable to delete a car in the Database.")
  }
})

module.exports = router;

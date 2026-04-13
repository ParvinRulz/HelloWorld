const express = require("express");
// const router = require("./authRoutes");
// const route = express.Router();

const router = express.Router();
const Registration = require("../models/Registration");
const Vehicle = require("../models/VehicleRegistration");
const Battery = require("../models/BatteryRegistration");
const Signout = require("../models/SignOut");
const TyreTransaction = require("../models/TireTransaction");
const BatteryTranction = require("../models/BatteryTransaction");
const { isAdmin, isAttendant, isManager } = require("../middleware/auth");

router.get("/adminDashboard", isAdmin, async (req, res) => {
  try {
    // determine the selected dates, default to today if none provided
    const queryDate = req.query.date ? new Date(req.query.date) : new Date();

    // create start and end of selected day for mongodb querrying
    const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

    // 1. query signed out vehicles for parking revenue
    const signedOutVehicles = await Signout.find({
      signoutDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("vehicleId")
      .sort({ signoutDate: -1 });

    // Calculate parking revenue
    const parkingRevenue = signedOutVehicles.reduce((total, record) => {
      return total + (record.amountPaid || 0);
    }, 0);

    // 2. Query Tyre transactions
    const tyreTransactions = await TyreTransaction.find({
      transactionDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Calculate Tyre revenue
    const tyreRevenue = tyreTransactions.reduce((total, record) => {
      return total + (record.amountPaid || 0);
    }, 0);

    // 3. Query Battery transactions
    const batteryTransactions = await BatteryTranction.find({
      transactionDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Calculate Battery revenue
    const batteryRevenue = batteryTransactions.reduce((total, record) => {
      return total + (record.amountPaid || 0);
    }, 0);
    res.render("admin-dashboard", { 
      selectedDate: startOfDay.toISOString().split("T")[0],
      signedOutVehicles,
      parkingRevenue,
      batteryRevenue,
      tyreRevenue
    });
  } catch (error) {
    console.error(error.message);
    res.status(401).send("Unable to get items from the db");
  }
  //   let users = await Registration.find().sort({ $natural: -1 });
});

router.get("/attendantDashboard", isAttendant, (req, res) => {
  res.render("attendant-dashboard");
});

router.get("/managerDashboard", isManager, (req, res) => {
  res.render("manager-dashboard");
});

module.exports = router;

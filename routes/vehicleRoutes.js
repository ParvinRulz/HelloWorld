const express = require("express");
const router = express.Router();

router.get("/registerVehicle", (req, res) => {
res.render("register-vehicle");
});

router.post("/registerVehicle", (req, res) => {
    console.log(req.body)
    res.redirect("/");
});

module.exports = router;
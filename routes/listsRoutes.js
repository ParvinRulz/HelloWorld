const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    res.render("usersList");
});

router.get("/cars", (req, res) => {
    res.render("carList");
});

router.get("/batteries", (req, res) => {
    res.render("batteriesList");
});

module.exports = router;
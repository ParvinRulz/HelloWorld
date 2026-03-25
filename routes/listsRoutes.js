const express = require("express");
const router = express.Router();

router.get("/lists", (req, res) => {
    res.render("lists");
});

module.exports = router;
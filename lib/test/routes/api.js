"use strict";

var router = require("express").Router();

router.get("/", function (req, res) {
  res.send("It's working!");
});

module.exports = router;
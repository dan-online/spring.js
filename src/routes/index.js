const express = require("express");
const router = express.Router();
const os = require("os-utils");

router.get("/", (req, res) => {
  const cpu = os.cpuUsage(function(cpu) {
    res.render("index", {cpu});
  });
});

module.exports = router;

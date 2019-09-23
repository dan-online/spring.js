var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("It's working!");
});

module.exports = router;

var router = require("express").Router();

router.get('/', (req, res, next) => {
    res.send("It's working!");
});

module.exports = router;
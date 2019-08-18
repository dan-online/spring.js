var router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('Hello, World.')    
})
module.exports = router;
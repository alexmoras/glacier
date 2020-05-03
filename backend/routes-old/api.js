var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status('404').send("This is not the page you are looking for...")
});

router.get('/brew', (req, res, next) => {
    res.status('418').send("I'm a teapot!")
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/rate', (req, res) => {
    res.render('rate');
});

module.exports = router;
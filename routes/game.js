const express = require('express');
const router = express.Router();

router.get('/shop', (req, res) => {
    res.render('shop');
});

module.exports = router;
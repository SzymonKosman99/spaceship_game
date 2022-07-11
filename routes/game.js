const express = require('express');
const router = express.Router();

const spaceship_big_price = 5000;
const spaceship_medium_price = 5000;
const space_mine_price = 1000;
const destroyer_missle_price = 7000;

router.get('/', (req, res) => {
    res.render('field');
});

router.get('/shop', (req, res) => {
    res.render('shop', {
        spaceship_big_price,
        spaceship_medium_price,
        space_mine_price,
        destroyer_missle_price,
    });
});
router.put('/shop', (req, res) => {
    const { cookieName, value } = req.body;
    if (cookieName && value) {
        res.cookie(cookieName, value);
    }
    res.json({ message: 'updated successfully' });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/shop', (req, res) => {
    res.render('shop');
});
router.put('/shop', (req, res) => {
    const { cookieName, value } = req.body;
    if (cookieName && value) {
        res.cookie(cookieName, value);
    }
    res.json({ message: 'updated successfully' });
});

module.exports = router;

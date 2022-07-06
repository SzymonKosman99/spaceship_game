const express = require('express');
const router = express.Router();

router.get('/shop', (req, res) => {
    res.render('shop');
});
router.post('/shop', (req, res) => {
    const { setting, value } = req.body.data;
    if (setting && value) {
        res.cookie(setting, value);
    }
    res.json({ message: 'ok' });
});

module.exports = router;

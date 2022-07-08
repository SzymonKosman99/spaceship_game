const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('settings');
});

router.put('/', (req, res) => {
    const { cookieName, value } = req.body;
    if (cookieName && value) {
        switch (cookieName) {
            case 'muted_click':
                res.cookie(cookieName, value);
                break;
            case 'muted_background':
                res.cookie(cookieName, value);
                break;
            case 'spaceship_red':
                res.cookie(cookieName, value);
                break;

            default:
                break;
        }
    }
    res.json({ message: 'updated successfully' });
});

module.exports = router;

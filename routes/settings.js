const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('settings');
});

router.post('/', (req, res) => {
    const { setting, value } = req.body.data;
    if (setting && value) {
        switch (setting) {
            case 'muted_click':
                res.cookie(setting, value);
                break;
            case 'muted_background':
                res.cookie(setting, value);
                break;
            case 'spaceship_red':
                res.cookie(setting, value);
                break;

            default:
                break;
        }
    }
    res.json({ message: 'ok' });
});

module.exports = router;

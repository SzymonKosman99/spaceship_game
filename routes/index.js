const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const { muted_click, muted_background, spaceship_red } = req.cookies;
    if (
        muted_click === undefined ||
        muted_background === undefined ||
        spaceship_red === undefined
    ) {
        res.cookie('muted_click', 'inactive');
        res.cookie('muted_background', 'inactive');
        res.cookie('spaceship_red', 'inactive');

        return res.render('start', {
            title: 'Spaceship game',
            muted_click: 'inactive',
            muted_background: 'inactive',
            spaceship_red: 'inactive',
        });
    }

    res.render('start', { title: 'Spaceship game' });
});

module.exports = router;

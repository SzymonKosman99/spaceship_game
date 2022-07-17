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
        res.cookie('max_enemy_number', '10');
        res.cookie('destroyer_missle', 'inactive');
        res.cookie('spaceship_red', 'inactive');
        res.cookie('spaceship_model', 'spaceship_small');
        res.cookie('spaceship_small', 'active');
        res.cookie('spaceship_medium', 'inactive');
        res.cookie('spaceship_big', 'inactive');
        res.cookie('space_mine', 'inactive');
        res.cookie('player_money', '1000');

        return res.render('start', {
            title: 'Spaceship game',
        });
    }

    res.render('start', { title: 'Spaceship game' });
});

module.exports = router;

const router = require('express').Router();
const { getUserByEmail } = require('../services/user')

router.get('/', async(req, res) => {
    // const hotels = await req.storage.getAllHotels();
    res.render('home/home');
});

router.get('/profile', async(req, res) => {
    req.user[`select${req.user.gender}`] = true;
    res.render('user/profile');
})

module.exports = router
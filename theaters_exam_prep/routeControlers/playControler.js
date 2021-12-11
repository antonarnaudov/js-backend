const {Router} = require("express");
const router = Router();
const {body, validationResult} = require('express-validator')
const playService = require("../services/playService");
const isGuest = require("../middlewares/isGuest");
const isAuth = require("../middlewares/isAuth");

router.get('/create', isAuth, (req, res) => {
    res.render('plays/create-theater')
})

router.post('/create', isAuth, async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.isPublic) {
            req.body.isPublic = true;
        }
        await playService.createPlay(req.body);
        res.redirect("/");
    } catch (err) {
        const ctx = req.body
        res.render("plays/create-theater", {title: "Create", err, ctx});
    }
})

module.exports = router;
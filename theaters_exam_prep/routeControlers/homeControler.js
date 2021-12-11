const { Router } = require("express");
const router = Router();
const playService = require('../services/playService')

router.get("/", async (req, res) => {
    let plays
    if (!res.locals.isAuthenticated) {
        plays = await playService.getAllPlays()
        plays = plays.slice(0, 3)
        plays = plays.sort((a, b) => b.usersLiked.length - a.usersLiked.length)
    } else {
        plays = await playService.getAllPlays({createdAt: 1})
    }
    res.render("home/home", { title: "Home Page", plays });
})


module.exports = router;
const { Router } = require("express");
const router = Router();
const housingService = require('../services/housingService')

router.get("/", async(req, res) => {
    let housing = await housingService.getAllHousings()
    housing = housing.slice(0, 3)
    res.render("home/home", { title: "Home Page", housing });
})

router.get("/for-rent", async(req, res) => {
    const housing = await housingService.getAllHousings()
    res.render('housings/aprt-for-recent', { title: 'For Rent', housing })
})

router.get('/search', async(req, res) => {
    res.render('housings/search', { title: 'Search' })
})

router.post('/search', async(req, res) => {
    const search = req.body.search
    const housing = await housingService.getAllHousings({ notice: String(search) })
    res.render('housings/search', { title: 'Search', housing })
})

module.exports = router;
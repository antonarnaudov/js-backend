const { Router } = require("express");
const router = Router();
const housingService = require("../services/housingService");
const isGuest = require("../middlewares/isGuest");
const isAuth = require("../middlewares/isAuth");
const { get } = require("mongoose");


router.get('/create', isAuth, (req, res) => {
    res.render('housings/create', { title: 'Create' })
})

router.post('/create', isAuth, async(req, res) => {
    try {
        req.body['rentedAHome'] = []
        req.body['owner'] = res.locals.user._id
        await housingService.createHousing(req.body);
        res.redirect("/");
    } catch (err) {
        const ctx = req.body
        res.render("housings/create", { title: "Create", err, ctx });
    }
})

router.get('/edit/:id', isAuth, async(req, res) => {
    const id = req.params.id
    const ctx = await housingService.getHousingById(id)
    res.render('housings/edit', { title: 'Edit', id, ctx })
})

router.post("/edit/:id", isAuth, async(req, res) => {
    try {
        await housingService.editHousing(req.params.id, req.body);
        res.redirect(`/housing/details/${req.params.id}`);
    } catch (err) {
        const ctx = req.body
        const id = req.params.id
        res.render("housings/edit", { title: "Edit", err, ctx, id });
    }
})

router.get("/details/:id", async(req, res) => {
    const housing = await housingService.getHousingById(req.params.id)
    if (res.locals.user) {
        housing.isOwner = String(housing.owner) === String(res.locals.user._id)
        housing.isRented = housing.rentedAHome.includes(String(res.locals.user._id))
    }
    housing.housingLeft = Number(housing.availablePieces) - housing.rentedAHome.length
    res.render("housings/details", { title: 'Details', housing })
})
module.exports = router;

router.get('/rent/:id', isAuth, async(req, res) => {
    const housing = await housingService.getHousingById(req.params.id)
        // housing.rentedAHome.append(res.locals.user._id)
        // await housingService.editHousing(req.params.id, housing)
    res.render("housings/details", { title: 'Details', housing })
})

router.get("/delete/:id", isAuth, async(req, res) => {
    await housingService.deleteHousingById(req.params.id)
    res.redirect('/')
})
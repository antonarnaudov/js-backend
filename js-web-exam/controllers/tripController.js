const router = require('express').Router();
const { isUser } = require('../middlewares/guards')
    // ---------- CREATE -----------

router.get('/create', isUser(), async(req, res) => {
    res.render('trip-create');
});


router.post('/create', isUser(), async(req, res) => {
    res.render('trip-create');

    const tripData = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imgUrl: req.body.imgUrl,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        creator: req.user._id,
        buddies: []
    }
    console.log(tripData)
    try {
        await req.storage.createTrip(tripData);
        res.redirect('/')
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message.split('\n')]
        }
        console.log(errors);

        console.log(err)
        const ctx = {
            errors: err.message.split('\n'),
            tripData: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                imgUrl: req.body.imgUrl,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        };
        res.render('trip-create', ctx);
    }
});

// ---------- EDIT -----------

router.get('/edit', isUser(), async(req, res) => {
    res.render('trip-edit');
});

router.post('/edit', isUser(), async(req, res) => {
    res.render('trip-edit');
});

// ---------- DETAILS -----------
router.get('/details', async(req, res) => {
    res.render('trip-details');
});

router.get('/shared', async(req, res) => {
    res.render('trip-details')
})

module.exports = router
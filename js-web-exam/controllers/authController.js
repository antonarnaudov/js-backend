const { isGuest } = require("../middlewares/guards");
const router = require('express').Router();
const { body, validationResult } = require('express-validator')

/* ------------- REGISTER ROUTER ------------- */
router.get('/register', isGuest(), (req, res) => {
    res.render('user/register')
})

router.post(
    '/register',
    isGuest(),
    body('email', 'Invalid email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be 5charchter')
    .bail().matches(/[a-zA-Z0-9]/).withMessage('Password may contain only english letters'),
    body('rePassword').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Password dont match!');
        }
        return true;
    }),
    body('gender').custom((value, { req }) => {
        if (value !== 'male' & value !== 'female') {
            throw new Error('Invalid gender!');
        }
    }),
    async(req, res) => {
        const { errors } = validationResult(req)
        const userData = {
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            tripsHistory: [],
        }
        console.log(req.body)
        try {
            if (errors.length > 1) {
                throw new Error(errors[0].msg)
            }

            await req.auth.register(userData)

            console.log('>>> Register Post -> ', req.body)
            res.redirect('/')

        } catch (err) {
            let userData = {
                email: req.body.email,
                gender: req.body.gender,
            }

            userData[`select${userData.gender}`] = true;

            const ctx = {
                errors,
                userData
            }
            console.log('>>> REGISTER ERROR: ', err.message, errors)

            res.render('user/register', ctx)
        }
    })

//* ------------- LOGIN ROUTER ------------- */
router.get('/login', isGuest(), (req, res) => {
    res.render('user/login')
})

router.post('/login', isGuest(), async(req, res) => {
    console.log('>>>Login Post')

    try {
        await req.auth.login(req.body.email, req.body.password)
        res.redirect('/')

    } catch (err) {

        const ctx = {
            errors: [err.message],
            userData: {
                email: req.body.email,
            }
        }
        console.log('>>> REGISTER ERROR: ', err.message)

        res.render('user/login', ctx)
    }
})

/* ------------- LOGOUT ROUTER ------------- */
router.get('/logout', (req, res) => {
    req.auth.logout()
    res.redirect('/')
})

module.exports = router
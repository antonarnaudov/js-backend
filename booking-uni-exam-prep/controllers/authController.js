const {isGuest} = require("../middlewares/guards");
const router = require('express').Router();
const {body, validationResult} = require('express-validator')

/* ------------- REGISTER ROUTER ------------- */
router.get('/register', isGuest(), (req, res) => {
    res.render('user/register')
})

router.post(
    '/register',
    isGuest(),
    body('email', 'Invalid email').isEmail(),
    body('username')
        .matches(/[a-zA-Z0-9]/).withMessage('Username must contain only english letters, numbers'), // TODO: Change according to requirements!
    body('password')
        .isLength({min: 5}).withMessage('Password must be at least 5 characters long.').bail()
        .matches(/[a-zA-Z0-9]/).withMessage('Password must contain only english letters, numbers.'),
    body('rePassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match!')
            }
            return true
        }),
    async (req, res) => {
        const {errors} = validationResult(req)

        try {
            if (errors.length > 1) {
                throw new Error(errors[0].msg)
            }

            await req.auth.register(req.body.username, req.body.password)

            console.log('>>> Register Post -> ', req.body)
            res.redirect('/')

        } catch (err) {
            const ctx = {
                error: errors[0].msg,
                userData: {
                    username: req.body.username,
                }
            }
            console.log('>>> REGISTER ERROR: ', err.message, errors)

            res.render('user/register', ctx)
        }
    })

/* ------------- LOGIN ROUTER ------------- */
router.get('/login', isGuest(), (req, res) => {
    res.render('user/login')
})

router.post('/login', isGuest(), async (req, res) => {
    console.log('>>>Login Post')

    try {
        await req.auth.login(req.body.username, req.body.password)
        res.redirect('/')

    } catch (err) {

        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username,
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
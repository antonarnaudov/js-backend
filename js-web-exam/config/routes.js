const authController = require('../controllers/authController')
const homeController = require('../controllers/homeController')
const tripController = require('../controllers/tripController')
const { notFound } = require('../controllers/notFound')

module.exports = (app) => {
    app.use('/auth', authController)
    app.use('/', homeController)
    app.use('/trip', tripController)
    app.all('*', notFound)
}
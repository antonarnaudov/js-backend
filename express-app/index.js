const express = require('express')
const hbs = require('express-handlebars')

const { init: storage } = require('./models/storage')

const { catalog } = require('./controllers/catalog')
const { details } = require('./controllers/details')
const { about } = require('./controllers/about')
const { create, post } = require('./controllers/create')
const { edit, editPost } = require('./controllers/edit')

const { notFound } = require('./controllers/notFound')

async function start() {

    const port = 3000
    const app = express()

    app.engine('hbs', hbs({
        extname: '.hbs'
    }))
    app.set('view engine', 'hbs')

    app.use('/static', express.static('static'))
    app.use('/js', express.static('js'))
    app.use(express.urlencoded({ extended: false }))

    app.use(await storage())

    app.get('/', catalog)
    app.get('/details/:id', details)
    app.get('/about', about)
    app.get('/create', create)
    app.post('/create', post)
    app.get('/edit/:id', edit)
    app.post('/edit/:id', editPost)

    app.all('*', notFound)

    app.listen(port, () => console.log(`Server listening on port ${port}`))
}

start()
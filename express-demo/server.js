const express = require('express');
const hbs = require('express-handlebars')

const app = express()

app.engine('.hbs', hbs({
    extname: '.hbs',
}))

app.set('view engine', '.hbs')

app.get('/', (req, res) => {
    const ctx = {
            title: 'My Page',
            user: {
                name: 'Petar',
                age: 24,
            },
            items: [{
                    type: 'Lint',
                    qty: 5
                },
                {
                    type: 'Wallet',
                    qty: 1
                },
                {
                    type: 'Coins',
                    qty: 3.50
                },
            ]
        }
        // res.render('home', ctx, {layout: 'layout-name'})
    res.render('home', ctx)
})



app.listen(3000, () => console.log('Server listening on port 3000'))
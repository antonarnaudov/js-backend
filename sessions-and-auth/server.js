const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/', (req, res) => {
    res.cookie('cookie', 'Hello')
    res.setHeader('Set-Cookie', 'sessionId=1')

    res.send('Hello')
})

app.listen(3000)
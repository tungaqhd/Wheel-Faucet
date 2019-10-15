const express = require('express')
const app = express()
const routes = require('./routes/index')

require('./db/mongoose')
const Settings = require('./models/settings')
const Rewards = require('./models/rewards')
const Links = require('./models/links')

const path = require('path')
const requestIp = require('request-ip')
const bodyParser = require('body-parser')
const session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret : 'nguyensytung', resave: false, saveUninitialized: true,}))

app.use(express.static(path.join(__dirname, './public')))
app.set('view engine', 'ejs')

app.use(async (req, res, next) => {
    try {
        [req.ip_address, req.settings, req.settings.rewards] = await Promise.all([requestIp.getClientIp(req), Settings.getAllSettings(), Rewards.find({})])
        next()
    } catch (e) {
        res.status(500).send()
    }
})
app.use(routes)
app.listen(3000, () => console.log('Server is running'))
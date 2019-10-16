const express = require('express')
const router = express.Router()

const home = require('./home')
const claim = require('./claim')
const verify = require('./verify')
const admin = require('./admin')

router.use('/', home)
router.use('/claim', claim)
router.use('/verify', verify)
router.use('/admin', admin)
module.exports = router
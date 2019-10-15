const express = require('express')
const router = express.Router()

const home = require('./home')
const claim = require('./claim')
const verify = require('./verify')

router.use('/', home)
router.use('/claim', claim)
router.use('/verify', verify)

module.exports = router
const express = require('express')
const router = express.Router()

const home = require('./home.router')
const claim = require('./claim.router')
const verify = require('./verify.router')
const admin = require('./admin.router')

router.use('/', home)
router.use('/claim', claim)
router.use('/verify', verify)
router.use('/admin', admin)
module.exports = router
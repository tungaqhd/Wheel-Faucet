const express = require('express')
const router = express.Router()

const claimController = require('../controllers/claim')
router.post('/', claimController.index)

module.exports = router
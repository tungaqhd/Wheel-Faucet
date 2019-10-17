const express = require('express')
const router = express.Router()

const verifyController = require('../controllers/verify')
router.get('/:key', verifyController.index)

module.exports = router
const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin')
const adminMiddleware = require('../middlewares/admin')

router.get('/', adminMiddleware.verify, adminController.index)
router.get('/login', adminController.login)
router.post('/login/verify', adminController.verify)
router.get('/overview', adminMiddleware.verify, adminController.overview)
router.get('/security', adminMiddleware.verify, adminController.security)
router.get('/ads', adminMiddleware.verify, adminController.ads)
router.post('/update', adminMiddleware.verify, adminController.update)
module.exports = router
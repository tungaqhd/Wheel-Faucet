const Settings = require('../models/settings')
exports.verify = async (req, res, next) => {
    if(!req.session.admin) {
        return res.redirect('/admin/login')
    }
    const check = await Settings.validateAdmin(req.session.admin)
    if(!check) {
        req.session.destroy()
        return res.redirect('/admin/login')
    } else {
        next()
    }
}
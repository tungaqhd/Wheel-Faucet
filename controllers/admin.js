const Settings = require('../models/settings')
const Rewards = require('../models/rewards')

exports.index = async (req, res) => {
    try {
        const { ip_address, settings } = req
        if (req.session.admin) {
            return res.redirect('/admin/overview')
        }
        else {
            res.redirect('/admin/login')
        }

    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.login = async (req, res) => {
    try {
        const { ip_address, settings } = req
        if (req.session.admin) {
            return res.redirect(301, '/admin/overview')
        }
        res.render('admin/login', settings)

    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.verify = async (req, res) => {
    try {
        req.session.admin = req.body.username + '-' + req.body.password
        res.redirect(301, '/admin/overview')

    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.overview = async (req, res) => {
    try {
        const { ip_address, settings } = req
        res.render('admin/overview', {settings})
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.security = async (req, res) => {
    try {
        const { ip_address, settings } = req
        res.render('admin/security', {settings})
    } catch(e) {
        console.log(e)
        res.status(500)
    }
}

exports.ads = async (req, res) => {
    try {
        const { ip_address, settings } = req
        res.render('admin/advertisement', {settings})
    } catch(e) {
        console.log(e)
        res.status(500)
    }
}

exports.update = async (req, res) => {
    const db = ['faucet_name', 'faucet_description', 'faucet_api', 'faucet_currency', 'faucet_timer', 'faucet_referral', 'faucet_iphub', 'faucet_ckey', 'faucet_vkey', 'faucet_hkey', 'faucet_top_ad', 'faucet_right_ad', 'faucet_right_ad', 'username', 'password']
    db.forEach(async (name) => {
        if(req.body[name]) {
            await Settings.updateOne({name}, {value : req.body[name]})
        }
    })
    res.redirect('/admin/overview')
}
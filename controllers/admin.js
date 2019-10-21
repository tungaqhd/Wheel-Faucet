const Settings = require('../models/settings')
const Rewards = require('../models/rewards')
const Links = require('../models/links')

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
        res.render('admin/overview', { settings })
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.security = async (req, res) => {
    try {
        const { ip_address, settings } = req
        res.render('admin/security', { settings })
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.ads = async (req, res) => {
    try {
        const { ip_address, settings } = req
        res.render('admin/advertisement', { settings })
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.reward = async (req, res) => {
    try {
        const { ip_address, settings } = req
        res.render('admin/reward', { settings })
    } catch (e) {
        console.log(e)
        res.status(500)
    }

}

exports.add_reward = async (req, res) => {
    const { _id, fillStyle, text, value } = req.body
    if (_id === '-1') {
        const newReward = Rewards({ fillStyle, text, value })
        newReward.save()
    } else {
        await Rewards.updateOne({ _id }, { fillStyle, text, value })
    }
    res.redirect('/admin/reward')
}

exports.delete_reward = async (req, res) => {
    await Rewards.deleteOne({ _id: req.body._id })
    res.redirect('/admin/reward')
}

exports.link = async (req, res) => {
    try {
        const { ip_address, settings } = req
        settings.links = await Links.find({})
        res.render('admin/link', { settings })
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.add_link = async (req, res) => {
    try {
        if (req.body.api_url) {
            const newLink = Links({ api_url: req.body.api_url })
            newLink.save()
        }
        res.redirect('/admin/link')
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
exports.delete_link = async (req, res) => {
    try {
        if (req.body._id) {
            await Links.deleteOne({ _id: req.body._id })
        }
        res.redirect('/admin/link')
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.update = async (req, res) => {
    try {
        const db = ['faucet_name', 'faucet_description', 'faucet_api', 'faucet_currency', 'faucet_timer', 'faucet_referral', 'faucet_iphub', 'faucet_ckey', 'faucet_vkey', 'faucet_hkey', 'faucet_top_ad', 'faucet_right_ad', 'faucet_right_ad', 'username', 'password']
        db.forEach(async (name) => {
            if (req.body[name]) {
                await Settings.updateOne({ name }, { value: req.body[name] })
            }
        })
        res.redirect('/admin/overview')
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
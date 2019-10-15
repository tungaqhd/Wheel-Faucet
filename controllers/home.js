const IpAddress = require('../models/ipaddress')
const Address = require('../models/address')
exports.index = async (req, res) => {
    try {
        const {ip_address, settings} = req
        const ipa = IpAddress({ ip_address, last_claim: 0 })
        const check = await ipa.checkReady(settings.faucet_timer)

        if (req.session.alert) {
            settings.alert = req.session.alert
            req.session.destroy()
        }
        if (check === 0) {
            res.render('claim', { settings })
        }
        else {
            settings.wait = check
            return res.render('wait', { settings })
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
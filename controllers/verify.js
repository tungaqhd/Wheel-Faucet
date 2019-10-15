const Verify = require('../models/verify')
const request = require('request-promise')
exports.index = async (req, res) => {
    try {
        const {ip_address, settings} = req
        const key = req.params.key
        let message = null, verify = null
    
        if (key.length != 20)
            message = 'Invalid Keys'
        else {
            verify = await Verify.verifyKeys(key, ip_address)
            if (!verify)
                message = 'Invalid Keys'
        }
    
        if(!message) {
            message = await request({ method : 'POST', uri: 'https://faucethub.io/api/v1/send', json: true, body : {
                api_key : settings.faucet_api,
                currency : settings.faucet_currency,
                amount : verify.amount,
                to : verify.address
            } })
            if(message.status === 200)
                await Verify.deleteOne({secret_keys : key})
        }
    
        req.session.alert = message.message
        res.redirect(301, '/')
    } catch(e) {
        res.status(500)
    }
}
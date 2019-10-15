const IpAddress = require('../models/ipaddress')
const Address = require('../models/address')
const Transaction = require('../models/transactions')
const Links = require('../models/links')
const Verify = require('../models/verify')

const crypto = require('crypto')
const request = require('request-promise')
exports.index = async (req, res) => {
    try {
        const {ip_address, settings} = req
        const address = req.body.address
        const user = Address({ address, ip_address, last_claim: 0 })
        const ipa = IpAddress({ ip_address, last_claim: 0 })

        const [checkaddress, checkip] = await Promise.all([user.checkReady(settings.faucet_timer), ipa.checkReady(settings.faucet_timer)])
        if (!checkaddress || checkip) {
            return res.status(200).send({ status: 'error', message: 'You are not ready to claim!' })
        }

        // Get short link
        const viewedLinks = await Transaction.linkHistory(ip_address)
        viewedLinkIds = []
        viewedLinks.forEach(link => viewedLinkIds.push(link.link_id))
        const selectedLink = await Links.getLink(viewedLinkIds)
        if (!selectedLink.length){
            return res.status(200).send({ status: 'error', message: 'No more claims' })}

        // Calculate reward and radius
        const numRewards = settings.rewards.length
        const radius_per_reward = 360 / numRewards
        const reward = Math.floor(Math.random() * numRewards)
        const radius = Math.floor(Math.random() * (radius_per_reward * (reward + 1) - radius_per_reward * reward + 1)) + radius_per_reward * reward

        const secret_keys = crypto.randomBytes(10).toString('hex')
        for (let i = 0; i < selectedLink.length; i++) {

            // const urlVerify = req.protocol + '://' + req.headers.host + '/verify/' + randToken
            const urlVerify = req.protocol + '://[::1]/verify/' + secret_keys
            let link = selectedLink[i]['api_url']
            link = link.replace('{url}', urlVerify)

            const result = await request({ uri: link, json: true })
            if (!result || result['status'] != 'success')
                continue

            const transaction = Transaction({ address, ip_address, link_id: selectedLink[i]._id, last_claim: Date.now() })
            const verify = Verify({ address, ip_address, amount: settings.rewards[reward]['value'], created_time: Date.now(), secret_keys })
            transaction.save()

            await Promise.all([IpAddress.claimSuccess(ip_address), Address.claimSuccess(address)])
            verify.saveKeys()

            return res.send({
                status: 'success',
                resultUrl: result['shortenedUrl'],
                reward: settings.rewards[reward]['value'],
                radius
            })
        }
        res.send({
            status: 'error',
            message: 'Failed to connect to shortlink\'s servers'
        })
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
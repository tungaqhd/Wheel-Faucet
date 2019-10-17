exports.settings = async (req, res, next) => {
    try {
        [req.ip_address, req.settings, req.settings.rewards] = await Promise.all([requestIp.getClientIp(req), Settings.getAllSettings(), Rewards.find({})])
        next()
    } catch (e) {
        res.status(500).send()
    }
}
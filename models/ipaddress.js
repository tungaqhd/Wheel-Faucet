const mongoose = require('mongoose')

const ipaddressSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: 0
    },
    last_claim: {
        type: Number,
        required: true
    }
})

ipaddressSchema.methods.checkReady = async function (timer) {
    const ip_address = this.ip_address
    let findAddress = await IpAddress.findOne({ ip_address })
    if (!findAddress) {
        this.save()
        return 0
    }
    else if (Date.now() - findAddress.last_claim >= timer * 1000)
        return 0
    return (findAddress.last_claim + timer*1000 - Date.now())/1000
}
ipaddressSchema.statics.claimSuccess = async (ip_address) => {
    await IpAddress.updateOne({ ip_address }, { last_claim: Date.now()})
}
const IpAddress = mongoose.model('IpAddress', ipaddressSchema)
module.exports = IpAddress
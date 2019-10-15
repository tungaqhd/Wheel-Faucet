const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    referred_by: {
        type: String,
        default: '',
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

addressSchema.methods.checkReady = async function (timer) {
    const address = this.address
    let findAddress = await Address.findOne({ address })
    if (!findAddress) {
        this.save()
        return true
    }
    else if (Date.now() - findAddress.last_claim >= timer * 1000)
        return true
    return false
}
addressSchema.statics.claimSuccess = async (address) => {
    await Address.updateOne({ address }, { last_claim: Date.now() })
}
const Address = mongoose.model('Address', addressSchema)
module.exports = Address
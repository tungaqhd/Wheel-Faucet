const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    ip_address: {
        type: String,
        required: true,
        trim: true
    },
    link_id: {
        type: String,
        default: '',
        trim: true
    },
    last_claim: {
        type: Number,
        required: true
    }
})

transactionSchema.statics.linkHistory = async function (ip_address) {
    let find = await Transaction.find({ ip_address, last_claim: { $gte: Date.now() - 86400000 } }).select('link_id')
    return find
}
const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction
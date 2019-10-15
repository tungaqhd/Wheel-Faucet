const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
    address : {
        type : String,
        required : true,
        trim : true
    },
    ip_address : {
        type : String,
        required : true,
        trim : true
    },
    amount : {
        type : Number,
        required : true
    },
    created_time : {
        type : Number,
        required : true
    },
    secret_keys : {
        type : String,
        required : true
    }
})

verifySchema.statics.verifyKeys = async (secret_keys, ip_address) => {
    const find = await Verify.findOne({ip_address, secret_keys, created_time : {$gte : Date.now()-300000}})
    return find
}

verifySchema.methods.saveKeys = async function() {
    await Verify.deleteMany({address : this.address})
    this.save()
}
const Verify = mongoose.model('Verify', verifySchema)
module.exports = Verify
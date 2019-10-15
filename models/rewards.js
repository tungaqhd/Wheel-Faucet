const mongoose = require('mongoose')

const rewardSchema = new mongoose.Schema({
    fillStyle : {
        type : String,
        required : true,
        trim : true
    },
    text : {
        type : String,
        required : true,
        trim : true
    },
    value : {
        type : Number,
        required : true,
        min : 0
    }
})

const Rewards = mongoose.model('Rewards', rewardSchema)
module.exports = Rewards
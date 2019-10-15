const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    api_url : {
        type : String,
        required : true,
        trim : true
    }
})
linkSchema.statics.getLink = async (viewedLinkIds) => {
    const find = await Links.find({ _id : { $nin : viewedLinkIds }})
    return find
}
const Links = mongoose.model('Links', linkSchema)
module.exports = Links
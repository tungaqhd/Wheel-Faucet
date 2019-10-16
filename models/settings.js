const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true
    },
    value : {
        type : String,
        default : ''
    }
})

settingSchema.statics.getAllSettings = async () => {
    try {
        const settings_tmp = await Settings.find({})
        const settings = {}
        settings_tmp.forEach(i => {
            settings[i.name] = i.value
        })
        return settings
    }
    catch(e) {
        throw new Error(e)
    }
}

settingSchema.statics.validateAdmin = async (admin) => {
    let [usr, pw] = await Promise.all([Settings.find({name : 'username'}), Settings.find({name : 'password'})])
    username = usr[0].value
    password = pw[0].value
    return admin === username + '-' + password
}

const Settings = mongoose.model('Settings', settingSchema)
module.exports = Settings
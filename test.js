require('./db/mongoose')

const Settings = require('./models/Settings')
// const imp = [
//     { name: 'faucet_name', value: 'Fap Faucet' },
//     { name: 'faucet_description', value: 'Roll for Bitcoin' },
//     { name: 'faucet_api', value: '123456789' },
//     { name: 'faucet_currency', value: 'BTC' },
//     { name: 'faucet_timer', value: 900 },
//     { name: 'faucet_iphub', value: '123456789' },
//     { name: 'faucet_captcha', value: 'recaptcha' },
//     { name: 'faucet_captcha_public', value: 'public' },
//     { name: 'faucet_captcha_private', value: 'private' },
//     { name: 'faucet_top_ad', value: '<img src="http://via.placeholder.com/728x90.png">' },
//     { name: 'faucet_left_ad', value: '<img src="http://via.placeholder.com/160x600.png">' },
//     { name: 'faucet_right_ad', value: '<img src="http://via.placeholder.com/160x600.png">' }
// ]
// // const Rewards = require('./models/rewards')
// // const imp = [{fillStyle: '#eae56f', text: 'Prize One', value: 100},{ 'fillStyle': '#89f26e', text: 'Prize Two', value: 200},{ 'fillStyle': '#7de6ef', text: 'Prize Three', value: 300},{ 'fillStyle': '#e7706f', text: 'Prize Four', value: 400}]
// // const Links = require('./models/links')
// // const imp = [{api_url : 'https://dutchycorp.space/sh/api?api=bf4a0b89a5fcd1f8fc52782d8163b4595d591608&url={url}'}]
// const imp = [{address : '123', ip_address : '123', link_id : '123', last_claim: 0}]
// const Transaction = require('./models/transactions')
const imp = [{name : 'faucet_referral', value : '10'}]
const set = async (i) => {
    const setting = await new Settings(i)
    setting.save().then((r) => console.log(r)).catch((e) => console.log(e))
}

imp.forEach(i => {
    set(i)
})

// const mongoose = require('mongoose')

// const verifySchema = new mongoose.Schema({
//     address : {
//         type : String,
//         required : true,
//         trim : true
//     },
//     ip_address : {
//         type : String,
//         required : true,
//         trim : true
//     },
//     created_time : {
//         type : Number,
//         required : true
//     },
//     secret_keys : {
//         type : String,
//         required : true
//     }
// })

// verifySchema.statics.verifyKeys = async (secret_keys, ip_address) => {
//     const find = await Verify.findOne({ip_address, secret_keys, created_time : {$gte : Date.now()-300000}})
//     return find
// }

// verifySchema.methods.saveKeys = async function() {
//     const delAddress = (address) => Verify.deleteMany({address})
//     const delIp = () => Verify.deleteMany({ip_address})

//     await Promise.all[delAddress(this.address), delIp(this.ip_address)]
//     this.save()
// }
// const Verify = mongoose.model('Verify', verifySchema)
// Verify({address : '123', ip_address : '123', created_time : 123, secret_keys : '123'}).save()
// //
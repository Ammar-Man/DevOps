const mongoose = require('mongoose')

const bankAccountdSchema = new mongoose.Schema({
    makerId:      {type:String, required:true},
    visaCardId:{type:String, required:true},
    visaCardMoney:{type:String, required:true},
    bankAccountNumber: {type:  String, required: true} ,
    bankAccountBalance: {type:  String, required: true} 

},{timestamps: true})
module.exports = mongoose.model('Bankaccount', bankAccountdSchema)
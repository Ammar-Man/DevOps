const mongoose = require('mongoose')

const visacardSchema = new mongoose.Schema({
    maker:      {type:String, required:true},
    firstName: {type:  String, required: true} ,
    lastName: {type:  String, required: true} ,
    cardType: {type:  String, required: true} ,
    cardNumber: {type:  String, required: true , unique: true} ,
    cardDate: {type:  String, required: true} ,
    cardCode: {type:  String, required: true } ,
    cardMoney : {type:  String, required: true} 

},{timestamps: true})
module.exports = mongoose.model('Visacard', visacardSchema)
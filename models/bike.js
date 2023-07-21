const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    bikeName: {type:  String, required: true} ,
    bikePrice: {type:  String, required: true} ,
    bikeCondition: {type:  String, required: true} ,
    bikeDate: {type:  String, required: true} ,
    bikeImg: {type:  String, required: true} ,
    moreInfo: {type:  String, required: true } 

},{timestamps: true})
module.exports = mongoose.model('Bike', bikeSchema)
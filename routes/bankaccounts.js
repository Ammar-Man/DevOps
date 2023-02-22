const express = require('express')
const router = express.Router()
const User = require('../models/user')
const VisaCard = require('../models/visacard')
const BankAccount = require('../models/bankaccount')
// const Owned = require('../models/owned')
const authToken = require('../middleware/authToken')



// Get user info
router.get('/info', authToken, async (req, res) => {
    const getUser = await User.findOne({maker: req.authUser.sub})
   const getVisa = await VisaCard.findOne({maker: req.authUser.sub})
    console.log(getUser)
    console.log(getVisa)
    // res.send({
    //     userInfo: {
    //     _id: getUser._id,
    //     email: getUser.email,
    //     firstName: getUser.firstName,
    //     lastName: getUser.lastName}
    // })
})


// Get all visacards
router.get('/', authToken, async (req, res) => {
    console.log(req.authUser.sub)
   // console.log(req.params.id)
   try{
    const bankaccount = await BankAccount.find()
    res.send(bankaccount)
   }
 catch (error) {
    res.status(500).send({ msg: error.message })
}   
})


// Create new visacard
router.post('/', authToken,async (req, res) => {
    try {
        const getVisa = await VisaCard.findOne({maker: req.authUser.sub})
        console.log(req)
        const bankaccount = new BankAccount({
            makerId: getVisa.maker,
            visaCardId: getVisa._id,
            visaCardMoney: getVisa.cardMoney,
            bankAccountNumber: getVisa.cardNumber,
            bankAccountBalance: getVisa.cardMoney
        })
        //console.log(cabin)
        const newBankAccount = await bankaccount.save()
        res.send(newBankAccount)

    } catch (error) {
        res.status(500).send({ msg: error.message})
    }
})


module.exports = router
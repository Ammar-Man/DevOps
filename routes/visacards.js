const express = require('express')
const router = express.Router()
const VisaCard = require('../models/visacard')
const User = require('../models/user')
// const Owned = require('../models/owned')
const authToken = require('../middleware/authToken')

// Get all visacards
router.get('/', authToken, async (req, res) => {
    console.log(req.authUser.sub)
   // console.log(req.params.id)
   try{
    const visacards = await VisaCard.find()
    res.send(visacards)
   }
 catch (error) {
    res.status(500).send({ msg: error.message })
}   
})


// Create new visacard
router.post('/', authToken,async (req, res) => {
    try {
        const userInfo = await User.findById(req.authUser.sub)
        console.log(userInfo)
        console.log(req)
        const visacard = new VisaCard({
            maker: req.authUser.sub,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            cardType: req.body.cardType,
            cardNumber: req.body.cardNumber,
            cardDate: req.body.cardDate,
            cardCode: req.body.cardCode,
            cardMoney: req.body.cardMoney
        })
        //console.log(cabin)
        const newVidsCard = await visacard.save()
        res.send(newVidsCard)

    } catch (error) {
        res.status(500).send({ msg: error.message})
    }
})


module.exports = router
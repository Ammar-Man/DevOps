const express = require('express')
const router = express.Router()
const User = require('../models/user')
const VisaCard = require('../models/visacard')
const Bike = require('../models/bike')
// const Owned = require('../models/owned')
const authToken = require('../middleware/authToken')
// const bike = require('../models/bike')

// Get user info
router.get('/info', authToken, async (req, res) => {
// router.get('/info',  async (req, res) => {
    const getUser = await User.findById(req.authUser.sub);
    const getVisa = await VisaCard.findOne({ maker: req.authUser.sub })
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
// router.get('/', authToken, async (req, res) => {
    router.get('/', async (req, res) => {
    // console.log(req.authUser.sub)
    // console.log(req.params.id)
    try {
        const bike = await Bike.find()
        res.send(bike)
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
})


// Create new visacard
router.post('/', authToken, async (req, res) => {
    try {
        const getUser = await User.findById(req.authUser.sub);
        const bike = new Bike({

            bikeName: req.body.bikeName,
            bikePrice: req.body.bikePrice,
            bikeCondition: req.body.bikeCondition,
            bikeDate: req.body.bikeDate,
            bikeImg: req.body.bikeImg,
            moreInfo: req.body.moreInfo
        })
        const newBike = await bike.save()
        res.send(newBike)

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

// Delete the user
router.delete('/:id', authToken, async (req, res) => {
    // const geBike = await Bike.findById(req.authUser.sub);
    // console.log(getBike)
    try {
        console.log(req.params.id) //6332d8b5753176c70b0bb88c från använders inputt
        console.log(req.authUser.sub) // från token

        // console.log(Bike) // från token
        const bike = await Bike.deleteOne({
            _id: req.params.id,
            createdBy: req.authUser.sub
            //createdBy: req.authUser.sub  
        })
        res.status(200).send({ msg: "bike been deleted", bike: bike,  })
        if (!bike) { return res.status(404).send({ msg: "bike not found." }) }
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})


module.exports = router
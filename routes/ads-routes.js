const express = require('express')
const router = express.Router()

const { 
        getAds,
        getAd,
        getAdd,
        getAdTypeInfo,
        postAdd
} = require('../controllers/ads-controller')

//Get All ads
router.get('/ads', getAds)

//Get ad by id
router.get('/ads/:id', getAd)

//Get edit 
// router.get('/ad/edit/:id', getEdit)

//Get add 
router.get('/add', getAdd)

// Post add
router.post('/add', postAdd)

//Get add info
router.get('/getAdTypeInfo', getAdTypeInfo)

module.exports = router;

const express = require('express')
const router = express.Router()

const { getInternetAds,
        getInternetAd,
        addInternetAd,
        deleteInternetAd,
        updateInternetAd
} = require('../controllers/api-internetAd-controller')

// Get All InternetAds
router.get('/api/internetAds', getInternetAds)

// Add New InternetAd
router.post('/api/internetAd', addInternetAd)

// Get InternetAd by ID
router.get('/api/internetAd/:id' , getInternetAd)

// Delete InternetAd by ID
router.delete('/api/internetAd/:id', deleteInternetAd)

// Update InternetAd by ID
router.put('/api/internetAd/:id', updateInternetAd)

module.exports = router;

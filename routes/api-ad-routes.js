const express = require('express')
const router = express.Router()

const { getAds,
        getAd,
        addAd,
        deleteAd,
        updateAd
} = require('../controllers/api-ad-controller')

// Get All Ads
router.get('/api/ads', getAds)
// Add New Ad
router.post('/api/ad', addAd)
// Get Ad by ID
router.get('/api/ad/:id' , getAd)
// Delete Ad by ID
router.delete('/api/ad/:id', deleteAd)
// Update Ad by ID
router.put('/api/ad/:id', updateAd)

module.exports = router;
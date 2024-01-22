const express = require('express')
const router = express.Router()

const { getOutdoorAds,
        getOutdoorAd,
        addOutdoorAd,
        deleteOutdoorAd,
        updateOutdoorAd
} = require('../controllers/api-outdoorAd-controller')

// Get All OutdoorAds
router.get('/api/outdoorAds', getOutdoorAds)
// Add New OutdoorAd
router.post('/api/outdoorAd', addOutdoorAd)
// Get OutdoorAd by ID
router.get('/api/outdoorAd/:id' , getOutdoorAd)
// Delete OutdoorAd by ID
router.delete('/api/outdoorAd/:id', deleteOutdoorAd)
// Update OutdoorAd by ID
router.put('/api/outdoorAd/:id', updateOutdoorAd)

module.exports = router;
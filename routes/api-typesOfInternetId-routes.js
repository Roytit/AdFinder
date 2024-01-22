const express = require('express')
const router = express.Router()

const { getTypesOfInternetId,
        getTypeOfInternetId,
        addTypeOfInternetId,
        deleteTypeOfInternetId,
        updateTypeOfInternetId
} = require('../controllers/api-typesOfInternetId-controller')

// Get All Types Of Internet Id
router.get('/api/typesOfInternetId', getTypesOfInternetId)
// Add New Type Of Internet Id
router.post('/api/typeOfInternetId', addTypeOfInternetId)
// Get Type Of Internet Id by ID
router.get('/api/typeOfInternetId/:id' , getTypeOfInternetId)
// Delete Type Of Internet Id by ID
router.delete('/api/typeOfInternetId/:id', deleteTypeOfInternetId)
// Update Type Of Internet Id by ID
router.put('/api/typeOfInternetId/:id', updateTypeOfInternetId)

module.exports = router;
const express = require('express')
const router = express.Router()

const { getTypesOfOutdoorId,
        getTypeOfOutdoorId,
        addTypeOfOutdoorId,
        deleteTypeOfOutdoorId,
        updateTypeOfOutdoorId
} = require('../controllers/api-typesOfOutdoorId-controller')

// Get All Types Of Outdoor Id
router.get('/api/typesOfOutdoorId', getTypesOfOutdoorId)

// Add New Type Of Outdoor Id
router.post('/api/typeOfOutdoorId', addTypeOfOutdoorId)

// Get Type Of Outdoor Id by ID
router.get('/api/typeOfOutdoorId/:id' , getTypeOfOutdoorId)

// Delete Type Of Outdoor Id by ID
router.delete('/api/typeOfOutdoorId/:id', deleteTypeOfOutdoorId)

// Update Type Of Outdoor Id by ID
router.put('/api/typeOfOutdoorId/:id', updateTypeOfOutdoorId)

module.exports = router;
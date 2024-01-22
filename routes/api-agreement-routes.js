const express = require('express')
const router = express.Router()

const { getAgreements,
        getAgreement,
        addAgreement,
        deleteAgreement,
        updateAgreement
} = require('../controllers/api-agreement-controller')

// Get All Agreements
router.get('/api/agreements', getAgreements)

// Add New Agreement
router.post('/api/agreement', addAgreement)

// Get Agreement by ID
router.get('/api/agreement/:id' , getAgreement)

// Delete Agreement by ID
router.delete('/api/agreement/:id', deleteAgreement)

// Update Agreement by ID
router.put('/api/agreement/:id', updateAgreement)

module.exports = router;
const express = require('express')
const router = express.Router()

const {authRouter} = require('../controllers/api-authorization-controller')

// Authorization
router.post('/api/login', authRouter)

module.exports = router;
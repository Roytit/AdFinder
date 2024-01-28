const express = require('express')
const router = express.Router()

const { 
        getLogin,
        postLogin,
        regUser,
        getReg
} = require('../controllers/user-controller')

//Auth
router.get('/auth', getLogin)

router.post('/auth', postLogin)

//Reg
router.get('/reg', getReg)

router.post('/reg', regUser)

module.exports = router;

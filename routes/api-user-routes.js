const express = require('express')
const router = express.Router()

const { getUsers,
        getUser, 
        addUser,
        deleteUser,
        updateUser
} = require('../controllers/api-user-controller')

// Get All Users
router.get('/api/users', getUsers)
// Add New User
router.post('/api/user', addUser)
// Get User by ID
router.get('/api/user/:id' , getUser)
// Delete User by ID
router.delete('/api/user/:id', deleteUser)
// Update User by ID
router.put('/api/user/:id', updateUser)

module.exports = router;
const express = require('express')
const router = express.Router()

const { getRoles,
        getRole,
        addRole,
        deleteRole,
        updateRole
} = require('../controllers/api-role-controller')

// Get All Roles
router.get('/api/roles', getRoles)

// Add New Role
router.post('/api/role', addRole)

// Get Role by ID
router.get('/api/role/:id' , getRole)

// Delete Role by ID
router.delete('/api/role/:id', deleteRole)

// Update Role by ID
router.put('/api/role/:id', updateRole)

module.exports = router;
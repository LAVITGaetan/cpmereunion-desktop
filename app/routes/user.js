const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

// Add user
router.post('/add', controller.addUser)

// Reset password
router.post('/resetPassword/:id', controller.resetUserPassword)

// Edit user
router.post('/edit/:id', controller.editUser)

// Delete user
router.get('/delete/:id', controller.deleteUser)

module.exports = router;
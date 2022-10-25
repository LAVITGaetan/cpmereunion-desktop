const express = require('express');
const router = express.Router();
const controller = require('../controllers/adherent');


// Delete user
router.get('/delete/:id', controller.deleteAdherent)

module.exports = router;
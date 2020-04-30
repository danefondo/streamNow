const express = require('express');
const router = express.Router();
const auth = require('../config/auth')
const adminController = require('../controller/admin');

router.post('/make-admin/:userId', auth.ensureAuthenticated, adminController.makeAdmin);

router.post('/withdraw-admin/:userId', auth.ensureAuthenticated, adminController.withdrawAdmin);

router.get('/superadmin', auth.ensureAuthenticated, adminController.getAllUsers);

module.exports = router;
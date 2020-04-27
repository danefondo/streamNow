const express = require('express');
const auth = require('../config/auth')

const router = express.Router();

const streamController = require('../controller/stream');

router.get('/user/:userId', auth.checkAuthenticated, streamController.getStreamer);



module.exports = router;
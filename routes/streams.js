const express = require('express');
const auth = require('../config/auth');
const validator = require('../controller/validator');

const router = express.Router();

const streamController = require('../controller/stream');

router.get('/', streamController.fetchStreams); 

router.get('/:streamId', auth.checkAuthenticated, streamController.showStream);

router.post('/:streamId/updateLikes', auth.checkAuthenticated, streamController.updateLikes);

router.post('/:streamId/followUnfollow', auth.checkAuthenticated, streamController.followUnfollow);

router.post('/:streamId/endStream', auth.ensureAuthenticated, streamController.endStream);

router.post('/:streamId/register', validator.checkSignUpEmail, streamController.signUpForVideo);

module.exports = router;
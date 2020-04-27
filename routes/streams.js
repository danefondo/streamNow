const express = require('express');
const auth = require('../config/auth');

const router = express.Router();

const streamController = require('../controller/stream');

router.get('/', streamController.fetchStreams); 

router.get('/:streamId', auth.checkAuthenticated, streamController.showStream);

router.post('/:streamId/updateLikes', auth.checkAuthenticated, streamController.updateLikes);

router.post('/:streamId/followUnfollow', auth.checkAuthenticated, streamController.followUnfollow);

router.post('/:streamId/endStream', auth.ensureAuthenticated, streamController.endStream);

router.post('/:streamId/register', auth.checkAuthenticated, streamController.signUpForVideo);
router.post('/golive/:streamId', auth.ensureAuthenticated, streamController.goLive);

module.exports = router;


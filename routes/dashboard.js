const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


const auth = require('../config/auth')

const router = express.Router();

const imageController = require('../controller/image');
const streamController = require('../controller/stream');

router.get('/sign-s3', imageController.signS3);

router.post('/UploadSingleImage', imageController.uploadSingleImage);

router.post('/saveProfileImageReference', imageController.saveProfileImageReference);

router.post('/createLiveStream', streamController.schedule_live_stream);

router.post('/updateLiveStream', streamController.update_live_stream);

router.post('/scheduleLiveStream', streamController.schedule_live_stream);

router.delete('/DeleteImage', imageController.deleteImage);

router.delete('/DeleteProfileImage', imageController.deleteProfileImage);

router.get('/settings', function(req, res) {

	res.render('user__accountSettings', {
    settings: true
  });

})

router.get('/streams', auth.ensureAuthenticated, streamController.getAllUserStreams);

module.exports = router;
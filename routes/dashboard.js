const express = require('express');
const bodyParser = require('body-parser');
// const multer  = require('multer');
// const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
const assert = require('assert');
const mongoose = require('mongoose');
const passport = require('passport');
const { validationResult } = require('express-validator');
mongoose.Promise = Promise;

const config = require('../config/aws');

const auth = require('../config/auth')

const router = express.Router();

let User = require('../models/user');
let ExpiredUser = require('../models/expiredAccount');
const validator = require('../controller/validator')

const imageController = require('../controller/image');
const streamController = require('../controller/stream');

router.get('/sign-s3', imageController.signS3);

router.post('/UploadSingleImage', imageController.uploadSingleImage);

// router.post('/saveFileReference', imageController.saveFileReference);

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

router.get('/golive', function(req, res) {

	res.render('go_live');

})

router.get('/profile', function(req, res) {

	res.render('profile');

})


/*====== Access control  ======*/
// function ensureAuthenticated(req, res, next){
//   passport.authenticate('jwt', {session: false})
//   console.log("user", req.user)
//   // console.log("user is authenticated", req.isAuthenticated())
//   // if(req.isAuthenticated()){
//   // 	console.log("Authentication successful.");
//   //   return next();
//   // } else {
//   // 	console.log("Authentication failed.");
//   //   res.redirect(302, '/');
//   // }
// }

module.exports = router;
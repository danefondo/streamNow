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

const router = express.Router();

let User = require('../models/user');
let ExpiredUser = require('../models/expiredAccount');
const validator = require('../controller/validator')

const imageController = require('../controller/image');
const streamController = require('../controller/stream');

router.get('/sign-s3', ensureAuthenticated, imageController.signS3);

router.post('/UploadSingleImage', ensureAuthenticated, imageController.uploadSingleImage);

router.post('/saveFileReference', ensureAuthenticated, imageController.saveFileReference);

router.post('/saveProfileImageReference', ensureAuthenticated, imageController.saveProfileImageReference);

router.post('/createLiveStream', ensureAuthenticated, streamController.create_live_stream);

router.post('/updateLiveStream', ensureAuthenticated, streamController.update_live_stream);

router.post('/scheduleLiveStream', ensureAuthenticated, streamController.schedule_live_stream);

router.delete('/DeleteImage', ensureAuthenticated, imageController.deleteImage);

router.delete('/DeleteProfileImage', ensureAuthenticated, imageController.deleteProfileImage);

router.get('/settings', ensureAuthenticated, function(req, res) {

	res.render('user__accountSettings', {
    settings: true
  });

})

router.get('/golive', ensureAuthenticated, function(req, res) {

	res.render('go_live');

})

router.get('/profile', ensureAuthenticated, function(req, res) {

	res.render('profile');

})


/*====== Access control  ======*/
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
  	console.log("Authentication successful.");
    return next();
  } else {
  	console.log("Authentication failed.");
    res.redirect(302, '/');
  }
}

module.exports = router;
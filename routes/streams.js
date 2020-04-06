const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const assert = require('assert');
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.Promise = Promise;

const router = express.Router();

const streamController = require('../controller/stream');

router.post('/:streamId/updateLikes', streamController.updateLikes);

router.post('/:streamId/followUnfollow', streamController.followUnfollow);

router.post('/:streamId/endStream', ensureAuthenticated, streamController.endStream);


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
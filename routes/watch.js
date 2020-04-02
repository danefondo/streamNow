const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const assert = require('assert');
const mongoose = require('mongoose');
const passport = require('passport');
const { validationResult } = require('express-validator');
mongoose.Promise = Promise;

const router = express.Router();

let User = require('../models/user');
const validator = require('../controller/validator')

const streamController = require('../controller/stream');

router.get('/:streamId', ensureAuthenticated, streamController.showStream);


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
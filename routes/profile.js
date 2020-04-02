// Public profiles

const express = require('express');
const bodyParser = require('body-parser');
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


router.get('/:username', ensureAuthenticated, function(req, res) {

    let profile = "sexy"
    
    res.render('profile', {
        profile: profile
    });

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
/*====== IMPORT MODULES & LIBRARIES ======*/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const enforce = require('express-sslify');
const passport = require('passport');
const config = require('./config/database');
const cors = require('cors');

/*====== DATABASE SETUP ======*/

// Set up default mongoose connection // var db_uri = 'mongodb://127.0.0.1/my_database';
// var myURL = 'mongodb://127.0.0.1/curata-test-db';
// mongoose.connect(myURL, { useNewUrlParser: true });

// Production database
mongoose.connect(config.db_uri);
mongoose.set('useFindAndModify', false);

// Get default connection
let db = mongoose.connection;

// Get connection
db.once('open', function() {
	console.log('Connected to MongoDB.');
});

// Check for DB errors
db.on('error', function(err) {
	console.log('DB error: ', err);
});



/*====== APP ======*/
// Initializing the app
const app = express();
app.locals.moment = require('moment');

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}


// Load View Engine
// app.set('views', [path.join(__dirname, 'views'),
//   path.join(__dirname, '/views/entry__new')]);
// app.set('view engine', 'pug');

app.locals.basedir = path.join(__dirname, 'views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// note:: to be removed
app.use(cors({origin: 'http://localhost:8080'}))

// Set Public Folder
app.use(express.static(path.join(__dirname, 'client/dist/')));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());



/*====== ROUTES ======*/
// api routes
// app.get('/api/v1/streams', streamController.fetchStreams); 

// Home route
// app.get('/', streamController.getStreams); 

// app.get('/discover', streamController.getStreams);

// app.get('/scheduled', streamController.getScheduledStreams)


// app.get('/successful-registration', function(req, res) {
// 	res.render('RegisterSuccess');
// });

// app.get('/about', function(req, res) {
// 	res.render('about');
// });

// app.get('/privacy', function(req, res) {
// 	res.render('privacy');
// });

// app.get('/terms', function(req, res) {
// 	res.render('terms');
// });

// app.get('/contact', function(req, res) {
// 	res.render('contact');
// });



/*====== ROUTE FILES ======*/
let accounts = require('./routes/accounts');
let dashboard = require('./routes/dashboard');
let profile = require('./routes/profile');
let streams = require('./routes/streams');
let features = require('./routes/features');
let admin = require('./routes/admin');
app.use('/accounts', accounts);
app.use('/dashboard', passport.authenticate('jwt', { session: false }), dashboard);
app.use('/profile', profile);
app.use('/streams', streams);
app.use('/features', features);
app.use('/admin', admin);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
});
//comment


/*====== Access control  ======*/
// function ensureAuthenticated(req, res, next){
// 	console.log("Req.session ", req.session)
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//   	console.log("Sorry, but you gotta be logged in.")
//     res.redirect('/');
//   }
// }


/*====== Server setup  ======*/
let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
  // port = 27018;
}




/*====== Start server  ======*/
app.listen(port, function(){
  console.log('Server started on port ' + port);
});

/*http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});*/


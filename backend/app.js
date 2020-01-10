var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
var bcrypt = require('bcrypt');
var app = express();

// Routers
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

// Import models for use with database seeding
let User = require('./models/user');
let Organisation = require('./models/organisation');
let Service = require('./models/service');
let ICEProfile = require('./models/profile-ice');
let ServiceProfile = require('./models/profile-service');
let ActionLog = require('./models/action-log');

// set up database connection
const dbUrl = "mongodb://" + config.dbUser + ":" + config.dbPass + "@" + config.dbUrl;
mongoose.connect(dbUrl, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  let user = new User();
  user.email = ["user@glacier.alexmoras.com"];
  user.hash = bcrypt.hashSync("hashbrowns", 10);
  console.log(user.hash);
  user.save();
  console.log(user._id);
  let org = new Organisation();
  org.uniqueName = "neworg";
  org.displayName = "New Organisation";
  org.domain = "myneworg.com";
  org.owner = [user.id];
  org.staff = [user.id];
  org.techContact = "admin@" + org.domain;
  org.publicContact = "contact@" + org.domain;
  org.save();
  console.log("Database connected successfully.");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

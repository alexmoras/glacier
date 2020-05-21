var createError = require('http-errors');
var express = require('express');
const Sentry = require('@sentry/node');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./helpers/passport');
const mongoose = require('mongoose');
const config = require('./config');
var app = express();

Sentry.init({ dsn: config.sentry.dsn });
app.use(Sentry.Handlers.requestHandler());

// Routers
var apiRouter = require('./routes/api');  // Provides a JSON route for API.
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

// set up database connection
const dbUrl = "mongodb://" + config.db.user + ":" + config.secret.dbPass + "@" + config.db.url;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
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

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*");
  next();
})
 */

app.use('/', apiRouter);
app.use('/auth', authRouter);
app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);

app.use(Sentry.Handlers.errorHandler());

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

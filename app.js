
// Load the AWS SDK
const AWS = require('aws-sdk');var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

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


// Configure AWS with your access and secret key.
const ACCESS_KEY = 'AKIAXITLBWRM4SH4K4XW';
const SECRET_KEY = 'khA+V5DE13otE9kMAJyfuJ9KjVm0lNdvb7xN6Hg2';

// Set the region 
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: 'us-west-2' // specify the region
});

// Create an S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to retrieve the policy for the selected bucket
s3.getBucketAcl({Bucket: 'my-bucket'}, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else if (data) {
    console.log("Success", data.Policy);
  }
});


module.exports = app;

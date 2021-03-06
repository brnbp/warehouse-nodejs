var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var passport = require('passport'),
    BasicStrategy  = require('passport-http').BasicStrategy,
    config = require('config');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware para nao servir favicon.ico, pois es uma api restful
app.use(function(request, response, nextMiddleware){
  if (request.url === '/favicon.ico') { // caso seja requisitado favicon.ico
    response.writeHead(200, {'Content-Type': 'image/x-icon'})
    response.end()
  } else{
    //caso nao seja requisitado, ira pra proximo middleware
    nextMiddleware()
  }
})


// make authentication api
app.use(passport.initialize())
passport.use(
  new BasicStrategy(function(username, password, done){

    if (
      username.valueOf() === config.get('basic-auth.username') 
      && password.valueOf() == config.get('basic-auth.password')
    ) {
      return done(null, true)
    }
    return done(null, false)
  })
)


// router
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({err: err.message})
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500).json({err: err.message})
});


module.exports = app;

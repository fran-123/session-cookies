var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const methodOverride = require("method-override");

const session = require("express-session")

const userChecklogin = require("./middlewares/registerCheck")



/* rutas */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* controladores */
/* const userController = require("./controllers/userController");
const { values } = require('./validations/registerCheck');
 */
var app = express();


app.use(methodOverride("_method"))

// config de session

app.use(session({
  secret : 'mi secreto',
  saveUninitialized : true,
  resave : false,
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(userChecklogin)


/* vista de rutas */
app.use('/', indexRouter);
app.use('/user', usersRouter);


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

const createError = require('http-errors');
const express = require("express");
const app = express();
const mongo = require("./connection");
var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var postRoutes = require('./routes/post');
var registerRoutes = require('./routes/register');
const logger = require('morgan');
const path = require('path');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//----------------------------* view engine setup *----------------------------//

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//----------------------------* Connect DB *----------------------------//

mongo.connect();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//----------------------------* Middleware *----------------------------//

app.use(express.json());
app.use(cors());

//----------------------------* Routers *----------------------------//

app.use('/', indexRoutes );
app.use('/users', usersRoutes );
app.use('/register', registerRoutes );
app.use('/upload', postRoutes );

//----------------------------* Catch 404 and forward to error handler *----------------------------//

app.use(function (req, res, next) {
  next(createError(404));
});

//----------------------------* Error handler *----------------------------//

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//----------------------------* Setting Port *----------------------------//

const port = process.env.PORT || 5000;
app.set('port', port);
app.listen(port, () => console.log(`Server is stated on http://localhost:${port}`));


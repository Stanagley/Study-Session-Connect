var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/sessions');
var loginRouter = require('./routes/login');
var searchRouter = require('./routes/search')

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', usersRouter);
app.use('/login', loginRouter);
app.use('/search', searchRouter);

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

app.post('/sessions', async (req, res) => {
  try {
      const { location, major, class_name, time } = req.body;

      const newSession = await pool.query(
          "INSERT INTO sessions (location, major, class_name, time) VALUES ($1, $2, $3, $4) RETURNING *",
          [location, major, class_name, time]
      );

      res.json(newSession.rows[0]);

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var downloadRouter = require('./routes/download.routes');
var datatableRouter = require('./routes/datatable.routes');
var osobeRouter = require('./routes/osobe.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/datatable', datatableRouter);
app.use('/download', downloadRouter);
app.use('/osobe', osobeRouter);

app.use(function(req, res) {
        res.json({
          status: 404,
          message: 'Path does not exist'
        });
  });

module.exports = app;

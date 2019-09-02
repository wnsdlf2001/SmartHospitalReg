var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var timeout = require('connect-timeout');
var session = require('express-session');
var swig = require('swig');

var app = express();
var expressWs = require('express-ws')(app);
app.use(cors());

// view engine setup
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
if (app.get('env') === 'development') { // 개발 모드일경우 뷰엔진 캐쉬 사용 안함
    swig.setDefaults({
        cache: false,
        locals: {
            env: app.get('env')
        }
    });
}
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/
app.use(timeout('5s'));
app.use(logger((app.get('env') === 'development' ? 'dev' : 'default')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public'))); // public 폴더 static 라우팅
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // public 폴더 static 라우팅
app.use(session({
    secret: 'skkuproj',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

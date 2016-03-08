var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views',
    particalsDir: __dirname + '/views/particals',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(__dirname + '/public'));

routes(app);

app.listen(app.get('port'), function(){
    console.log('Express listen on port ' + app.get('port'));
})


module.exports = app;

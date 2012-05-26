var express = require('express'),
    swig = require('swig'),
    app = express.createServer();

// express configuration
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

// Register Swig as the template renderer
app.register('.html', swig);
app.set('view engine', 'html');

// Set up your views directory
swig.init({
    root: '/',
    allowErrors: true // allows errors to be thrown and caught by express
});
app.set('views', 'views/');

// Setting this to false allows to properly use {% extends %} and {% block %} tags
app.set('view options', { layout: false });

// rendering root
app.get('/', function (req, res) {
    res.render('layout.html', { foo: 'bar' });
});

// listen to port 3000
app.listen(3000);

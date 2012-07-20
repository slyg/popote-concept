// ---------------------
// | Main dependencies |
// ---------------------

	var express = require('express'),
	    swig = require('swig'),
	    app = express.createServer();

// -------------------------
// | express configuration |
// -------------------------

	app.configure(function(){
	    app.use(express.methodOverride());
	    app.use(express.bodyParser());
	    app.use(app.router);
	});
	
	app.configure('development', function(){
	    app.use(express.static(__dirname + '/static'));
	    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});
	
	app.configure('production', function(){
	  var oneYear = 31557600000;
	  app.use(express.static(__dirname + '/static', { maxAge: oneYear }));
	  app.use(express.errorHandler());
	});
	
	// Register Swig as the template renderer
	app.register('.html', swig);
	app.set('view engine', 'html');
	
	// Set up your views directory
	swig.init({ 
	    root: __dirname + '/views', 
	    allowErrors: true // allows errors to be thrown and caught by express 
	});
	
	// Same for Express
	app.set('views', __dirname + '/views');
	
	// Setting this to false allows to properly use {% extends %} and {% block %} tags
	app.set('view options', { layout: false });
	

// -------------------------
// | Main prototype Routes |
// -------------------------


	app.get('/', function (req, res) {
	    res.redirect('/login');
	});
	
	app.get('/concept', function (req, res) {
	    res.render('concept', {});
	});
		
	app.get('/login', function(req, res){
	    res.render('login', {});
	});
	
	app.post('/authenticate', function(req, res){
		res.redirect('/home');
	});
	
	app.get('/home', function(req, res){
		res.render('home', {});
	});
	
	app.get('/metrolines', function(req, res){
	    res.render('metrolines', {});
	});
	
	app.get('/popotes', function(req, res){
	    res.render('popotes', {});
	});
	
	app.get('/popote', function(req, res){
	    res.render('popote', {});
	});
	
	app.post('/coupon/new', function(req, res){
		res.redirect('/coupon');
	});
	
	app.get('/coupon', function(req, res){
	    res.render('coupon', {});
	});


// -----------------------
// | listen to port 3000 |
// -----------------------

	console.log('listening to localhost:4000');
	app.listen(4000);

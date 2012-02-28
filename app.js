
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , public = __dirname + '/public';

var app = module.exports = express.createServer();


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dali');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: public, enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(public));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
    app.get('/thankyou', routes.thankyou);
app.get('/registrationList', routes.registrationList);
app.get('/export', routes.export);
app.get('/', routes.index);
app.post('/', routes.register);

app.listen(3100);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
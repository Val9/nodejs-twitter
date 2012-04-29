(function() {
  var app, config, express, hash, http, login, mongoose, profile, restrict, signup, site, tweets;

  express = require('express');

  http = require('http');

  mongoose = require('mongoose');

  app = express();

  config = {
    title: 'Nodejs Twitter',
    version: '0.1',
    port: process.argv[2] || 3000,
    host: 'localhost',
    href: process.argv[2] ? "http://localhost:" + process.argv[2] + "/" : "http://localhost/",
    db: 'twitter'
  };

  mongoose.connect("mongodb://" + config.host + "/" + config.db);

  restrict = require('./lib/restrict');

  hash = require('./lib/hash');

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('hocus-pocus-monkey-focus'));
    app.use(express.session());
    return app.use(app.router);
  });

  app.configure('development', function() {
    return app.use(express.errorHandler());
  });

  app.locals.use(function(req, res, done) {
    var err, info, msg, warn;
    res.locals.session = req.session;
    res.locals.title = config.title;
    res.locals.href = config.href;
    err = req.session.error;
    msg = req.session.success;
    warn = req.session.warning;
    info = req.session.info;
    delete req.session.error;
    delete req.session.success;
    delete req.session.warning;
    delete req.session.info;
    res.locals.flash = '';
    if (err) {
      res.locals.flash = '<div class="alert alert-error"><strong>Error!</strong> ' + err + '</div>';
    }
    if (warn) {
      res.locals.flash = '<div class="alert alert-warning"><strong>Warning!</strong> ' + warn + '</div>';
    }
    if (info) {
      res.locals.flash = '<div class="alert alert-info"><strong>Hold Up!</strong> ' + info + '</div>';
    }
    if (msg) {
      res.locals.flash = '<div class="alert alert-success"><strong>Success!</strong> ' + msg + '</div>';
    }
    if (req.session.authenticated) {
      return require('./lib/getUser')(req.session.uid, function(results) {
        res.locals.objUser = results;
        return done();
      });
    } else {
      return done();
    }
  });

  site = require('./controllers/site');

  login = require('./controllers/login');

  signup = require('./controllers/signup');

  profile = require('./controllers/profile');

  tweets = require('./controllers/tweets');

  app.get('/', site.index);

  app.get('/logout', site.logout);

  app.get('/login', login.index);

  app.post('/login', login.doLogin);

  app.get('/signup', signup.index);

  app.post('/signup', signup.register);

  app.get('/tweets', restrict, tweets.index);

  app.get('/tweets/new', restrict, tweets["new"]);

  app.post('/tweets/new', restrict, tweets.post);

  app.get('/tweets/delete/:id', restrict, tweets["delete"]);

  app.get('/account', restrict, profile.account);

  app.post('/account', restrict, profile.update);

  app.get('/:id', profile.view);

  app.all('*', site.notFound);

  http.createServer(app).listen(config.port);

  console.log("" + config.title + " @ " + config.version + " listening on port " + config.port);

}).call(this);

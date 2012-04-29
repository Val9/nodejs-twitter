(function() {

  exports.index = function(req, res) {
    if (req.session.authenticated) {
      return res.redirect('/tweets');
    } else {
      return res.render('index', {});
    }
  };

  exports.notFound = function(req, res) {
    return res.render('404');
  };

  exports.logout = function(req, res, done) {
    delete req.session.authenticated;
    return res.redirect('/');
  };

}).call(this);

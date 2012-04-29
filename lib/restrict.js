(function() {

  module.exports = function(req, res, next) {
    if (req.session.authenticated) {
      return next();
    } else {
      req.session.info = 'You must be logged in to continue.';
      return res.redirect('/login');
    }
  };

}).call(this);

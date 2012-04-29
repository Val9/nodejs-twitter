(function() {
  var ModelUser, hash;

  ModelUser = require('../models/user.coffee');

  hash = require('../lib/hash');

  exports.index = function(req, res) {
    return res.redirect('/');
  };

  exports.doLogin = function(req, res) {
    var email, password;
    email = req.body.txtEmail || '';
    password = hash(req.body.txtPassword);
    return ModelUser.findOne({
      email: email,
      password: password
    }, function(err, results) {
      if (err) console.log(err);
      if (results != null) {
        req.session.uid = results._id;
        req.session.authenticated = true;
        return res.redirect('/tweets');
      } else {
        req.session.error = 'bad login';
        return res.redirect('/');
      }
    });
  };

}).call(this);

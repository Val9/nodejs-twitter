(function() {
  var ModelUser;

  ModelUser = require('../models/user');

  exports.index = function(req, res) {
    return res.redirect('/');
  };

  exports.register = function(req, res) {
    var email, password, username;
    username = req.body.txtUsername || '';
    email = req.body.txtEmail || '';
    password = req.body.txtPassword || '';
    if (password.length < 6) {
      req.session.error = "Password must be at least 6 characters";
      return res.redirect('/');
    } else {
      return ModelUser.findOne({
        $or: [
          {
            'email': email
          }, {
            'username': username
          }
        ]
      }, function(err, results) {
        var user;
        if (err) console.log(err);
        if (!(results != null)) {
          user = new ModelUser;
          user.username = username;
          user.email = email;
          user.password = password;
          return user.save(function(err) {
            if (err) console.log(err);
            req.session.success = 'You have successfully joined. You may login';
            return res.redirect('/');
          });
        } else {
          if (results.email === email) {
            req.session.error = ' Email address already in use';
            return res.redirect('/');
          } else {
            req.session.error = ' Username address already in use';
            return res.redirect('/');
          }
        }
      });
    }
  };

}).call(this);

(function() {
  var ModelTweets, ModelUser;

  ModelUser = require('../models/user');

  ModelTweets = require('../models/tweets');

  exports.index = function(req, res) {
    return res.render('index');
  };

  exports.account = function(req, res) {
    return res.render('user/edit');
  };

  exports.update = function(req, res) {
    var email, query, username;
    username = req.body.txtUsername;
    email = req.body.txtEmail;
    query = {
      '_id': req.session.uid
    };
    return ModelUser.findOne({
      $or: [
        {
          'email': email
        }, {
          'username': username
        }
      ],
      $not: [query]
    }, function(err, results) {
      if (err) console.log(err);
      if (!(results != null)) {
        return ModelUser.update(query, {
          username: username,
          email: email
        }, {}, function(err, numAffected) {
          if (err) console.log(err);
          if (numAffected > 0) {
            req.session.success = 'Your settings have been saved';
            return res.redirect('/account');
          } else {
            req.session.alert = 'An unknown error occured';
            return res.redirect('/account');
          }
        });
      } else {
        if (results.email === email) {
          req.session.error = ' Email address already in use';
          return res.redirect('/account');
        } else {
          req.session.error = ' Username address already in use';
          return res.redirect('/account');
        }
      }
    });
  };

  exports.view = function(req, res) {
    var username;
    username = req.params.id;
    return ModelUser.findOne({
      username: username
    }, function(err, profile) {
      if (!(profile != null)) {
        return res.render('user/not_found');
      } else {
        return ModelTweets.find({
          author: profile._id
        }, function(err, tweets) {
          if (tweets.length === 0) {
            return res.render('user/view', {
              tweets: 0,
              profile: profile
            });
          } else {
            return res.render('user/view', {
              tweets: tweets || {},
              profile: profile
            });
          }
        });
      }
    });
  };

}).call(this);

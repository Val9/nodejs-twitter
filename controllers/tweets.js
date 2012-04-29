(function() {
  var ModelTweets, ModelUser;

  ModelTweets = require('../models/tweets');

  ModelUser = require('../models/user');

  exports.index = function(req, res, done) {
    var count, tweets;
    tweets = new Array;
    count = 0;
    return ModelTweets.find({}, function(err, tweetResults) {
      if (tweetResults.length === 0) {
        return res.render('tweets/index', {
          tweets: 0
        });
      } else {
        return tweetResults.forEach(function(tweetInfo) {
          count++;
          ModelUser.findOne({
            '_id': tweetInfo.author
          }, function(err, userInfo) {
            return tweets.push({
              id: tweetInfo._id,
              tweet: tweetInfo.tweet,
              created_at: tweetInfo.created_at,
              author: userInfo.username
            });
          });
          if (count === tweetResults.length) {
            return res.render('tweets/index', {
              tweets: tweets || {}
            });
          }
        });
      }
    });
  };

  exports["new"] = function(req, res) {
    return res.render('tweets/new');
  };

  exports.post = function(req, res) {
    var Tweet, author, text;
    text = req.body.txtTweet;
    author = req.session.uid;
    Tweet = new ModelTweets;
    Tweet.author = author;
    Tweet.tweet = text;
    return Tweet.save(function(err, results) {
      if (err) {
        console.log(err);
        req.session.error = "Error saving tweet";
        return res.redirect('/tweets/new');
      } else {
        console.log(results);
        req.session.success = "Tweet Posted";
        return res.redirect('/tweets');
      }
    });
  };

  exports["delete"] = function(req, res) {
    var tweetId, userId;
    tweetId = req.params.id;
    userId = req.session.uid;
    return ModelTweets.findById(tweetId, function(err, tweet) {
      if ((tweet != null) && tweet.author === userId) {
        tweet.remove();
        req.session.success = "Tweet Deleted";
        return res.redirect('/tweets');
      } else {
        req.session.error = "Sorry, that tweet isn't yours!";
        return res.redirect('/tweets');
      }
    });
  };

  exports.view = function(req, res) {
    return res.render('tweets/view');
  };

}).call(this);

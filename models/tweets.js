(function() {
  var Schema, TweetSchema, getUser, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  getUser = require('../lib/getUser');

  TweetSchema = new Schema({
    author: {
      type: String,
      required: true
    },
    tweet: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      "default": Date.now
    }
  });

  module.exports = mongoose.model('tweet', TweetSchema);

}).call(this);

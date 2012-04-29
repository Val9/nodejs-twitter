ModelTweets = require '../models/tweets'
ModelUser = require '../models/user'

exports.index = (req,res,done) ->
  tweets = new Array
  count = 0;
  
  ModelTweets.find {}, (err, tweetResults) ->
    if tweetResults.length == 0
      res.render 'tweets/index', tweets: 0
    else
      # Get the Author for each tweet
      tweetResults.forEach (tweetInfo) ->
        count++
        ModelUser.findOne {'_id': tweetInfo.author}, (err, userInfo) ->
          tweets.push {id: tweetInfo._id, tweet: tweetInfo.tweet, created_at: tweetInfo.created_at, author: userInfo.username}
      
        if count == tweetResults.length
          res.render 'tweets/index', {tweets: tweets || {}}
    
  
exports.new = (req, res) ->
  res.render 'tweets/new'

exports.post = (req,res) ->
  text = req.body.txtTweet
  author = req.session.uid
  
  Tweet = new ModelTweets
  Tweet.author = author
  Tweet.tweet = text
  
  Tweet.save (err, results) ->
    if err
      console.log err
      req.session.error = "Error saving tweet"
      res.redirect '/tweets/new'
    else
      console.log results 
      req.session.success = "Tweet Posted"
      res.redirect '/tweets'

exports.delete = (req, res) ->
  tweetId = req.params.id
  userId = req.session.uid
  
  ModelTweets.findById tweetId, (err, tweet) ->
    
    if tweet? and tweet.author == userId
      tweet.remove()
      req.session.success = "Tweet Deleted"
      res.redirect '/tweets'
    else
      req.session.error = "Sorry, that tweet isn't yours!"
      res.redirect '/tweets'
    
exports.view = (req, res) ->
  res.render 'tweets/view'
ModelUser = require '../models/user'
ModelTweets = require '../models/tweets'

exports.index = (req, res) ->
  res.render 'index'

exports.account = (req,res) ->
    res.render 'user/edit'

exports.update = (req,res) ->
  username = req.body.txtUsername
  email = req.body.txtEmail
  
  query = {'_id': req.session.uid}
  
  ModelUser.findOne { $or:[ {'email':email}, {'username':username} ], $not: [ query ]}, (err, results ) ->
    if err then console.log err
    
    if !results?
      
      ModelUser.update query, {username: username, email: email}, {}, (err, numAffected) ->
        
        if err then console.log err
        
        if numAffected > 0
          req.session.success = 'Your settings have been saved'
          res.redirect '/account'
        else
          req.session.alert = 'An unknown error occured'
          res.redirect '/account'
    else
      if results.email == email
        req.session.error = ' Email address already in use'
        res.redirect '/account'
      else
        req.session.error = ' Username address already in use'
        res.redirect '/account'

exports.view = (req,res) ->
  username = req.params.id
  ModelUser.findOne {username: username}, (err, profile) ->
    if not profile?
      res.render 'user/not_found'
    else
      ModelTweets.find {author: profile._id}, (err, tweets) ->
        if tweets.length == 0
          res.render 'user/view', {tweets: 0, profile: profile}
        else
          res.render 'user/view', {tweets: tweets or {}, profile: profile}
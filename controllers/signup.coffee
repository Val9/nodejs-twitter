ModelUser = require '../models/user'

exports.index = (req, res) ->
  res.redirect '/'
  
exports.register = (req, res) ->
  username = req.body.txtUsername or ''
  email = req.body.txtEmail or ''
  password = req.body.txtPassword or ''
  
  if password.length < 6
    req.session.error = "Password must be at least 6 characters"
    res.redirect '/'
  
  else
    ModelUser.findOne { $or:[ {'email':email}, {'username':username} ]}, (err, results ) ->
      if err then console.log err
      
      if !results?
        user = new ModelUser
        user.username = username
        user.email = email
        user.password = password
        
        user.save (err) ->
          if err then console.log err
          req.session.success = 'You have successfully joined. You may login'
          res.redirect '/'
      else
        if results.email == email
          req.session.error = ' Email address already in use'
          res.redirect '/'
        else
          req.session.error = ' Username address already in use'
          res.redirect '/'
  
  
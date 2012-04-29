ModelUser = require '../models/user.coffee'
hash = require '../lib/hash'


exports.index = (req, res) ->
  res.redirect '/'
  
exports.doLogin = (req, res) ->
  
  email = req.body.txtEmail or ''
  password = hash req.body.txtPassword
  
  ModelUser.findOne {email: email, password: password}, (err, results) ->
    if err then console.log err
    if results?
       req.session.uid = results._id
       req.session.authenticated = true
       res.redirect '/tweets'
    else
       req.session.error = 'bad login'
       res.redirect '/'
   
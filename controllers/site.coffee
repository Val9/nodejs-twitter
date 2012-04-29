
exports.index = (req, res) ->
  if req.session.authenticated
    res.redirect '/tweets'
  else
    res.render 'index', {}

exports.notFound = (req,res) ->
  res.render '404'

exports.logout = (req,res,done) ->
  delete req.session.authenticated
  res.redirect '/'
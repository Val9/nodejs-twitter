module.exports = (req, res, next) ->
    if req.session.authenticated
      next()
    else
      req.session.info = 'You must be logged in to continue.';
      res.redirect '/login'
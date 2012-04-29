
module.exports = (uid, callback) ->
  ModelUser = require '../models/user'

  ModelUser.findById uid, (err, results) ->
    if callback?
      callback(results)
    else
      results
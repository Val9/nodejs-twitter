(function() {

  module.exports = function(uid, callback) {
    var ModelUser;
    ModelUser = require('../models/user');
    return ModelUser.findById(uid, function(err, results) {
      if (callback != null) {
        return callback(results);
      } else {
        return results;
      }
    });
  };

}).call(this);

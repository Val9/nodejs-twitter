(function() {
  var crypto;

  crypto = require('crypto');

  module.exports = function(msg) {
    return crypto.createHmac('sha256', 'SaltySardineSaladSandwiches').update(msg).digest('hex');
  };

}).call(this);

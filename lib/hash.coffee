crypto = require 'crypto'
module.exports = (msg) ->
  crypto.createHmac('sha256', 'SaltySardineSaladSandwiches').update(msg).digest('hex')
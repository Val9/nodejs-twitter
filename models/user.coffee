mongoose = require 'mongoose'

Schema = mongoose.Schema

toLower = (v) ->
  v.toLowerCase()

hash = require '../lib/hash'
  

UserSchema = new Schema
	username: {type: String, required: true, set: toLower, unique: true }
	email: {type: String, required: true, set: toLower }
	password: {type: String, required: true, set: hash }
	avatar: String
  
module.exports = mongoose.model 'user', UserSchema

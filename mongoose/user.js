'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

User.plugin(passportLocalMongoose);

User.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  //hash the password and set the field to be the hash.
  bcrypt.hash(this.password, null, null, function (err, hash) {
    if (err) {
      console.error(err);return next(err);
    }
    user.password = hash;
    next();
  });
});

User.pre('save', function (next) {
  var user = this;

  if (!user.isModified('username')) return next();

  user.username = user.username.toLowerCase();
  next();
});

User.methods.verifyPassword = function (candidate) {
  console.log('verifying password...');
  //synch function. TODO refactor all this and server to be async.
  return bcrypt.compareSync(candidate, this.password);
};

module.exports = mongoose.model('users', User);

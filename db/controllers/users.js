var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var User = require('../models/index.js').User;


var comparePassword = function(user, attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, user.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

var create = function(props, callback) {
  User.build(props)
  .save()
  .then(function(user) {
    callback(user);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  User.findAll().then(function(users) {
    callback(users);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(query, callback) {
  User.findOne(query).done(function(user) {
      callback(user);
  });
};

var isLoggedIn = function(req) {
  return req.session ? !!req.session.email : false;
};

exports.checkAuth = function(req, res, next) {

  if (!isLoggedIn(req) && !(req.url.indexOf('/signin') >= 0) && !(req.url.indexOf('/signup') >= 0)) {
    console.log('inside if')
    res.redirect('/signin');
  } else {
    console.log('inside else')
    next();
  }
};

exports.createSession = function(req, res, newUser, response) {
  return req.session.regenerate(function() {
    req.session.email = newUser.email;
    req.session.password = newUser.password;
    res.send(response);
  });
};

exports.comparePassword = comparePassword;
exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
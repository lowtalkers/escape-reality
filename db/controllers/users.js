const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const User = require('../models/index.js').User;

exports.comparePassword = (user, attemptedPassword, callback) => {
  bcrypt.compare(attemptedPassword, user.get('password'), (err, isMatch) => {
    callback(isMatch);
  });
};

exports.create = (props, callback) => {
  User.build(props)
  .save()
  .then(user => {
    callback(user);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = callback => {
  User.findAll()
  .then(users => {
    callback(users);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  User.findOne(query)
  .done(user => {
    callback(user);
  });
};

exports.isLoggedIn = req => {
  return req.session ? !!req.session.email : false;
};

exports.checkAuth = (req, res, next) => {
  if (!exports.isLoggedIn(req) && 
      !(req.url.indexOf('/signin') >= 0) && 
      !(req.url.indexOf('/signup') >= 0)) {
    console.log('Redirecting to /signin');
    res.redirect('/signin');
  } else {
    console.log('Executing next() after checkAuth() passed');
    next();
  }
};

exports.createSession = (req, res, newUser, response) => {
  return req.session.regenerate(() => {
    req.session.email = newUser.email;
    req.session.password = newUser.password;
    res.send(response);
  });
};
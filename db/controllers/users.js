const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const User = require('../models/index.js').User;

const comparePassword = (user, attemptedPassword, callback) => {
  bcrypt.compare(attemptedPassword, user.get('password'), (err, isMatch) => {
    callback(isMatch);
  });
};

const create = (props, callback) => {
  User.build(props)
  .save()
  .then(user => {
    callback(user);
  })
  .catch(err => {
    console.log(err);
  });
};

const findAll = callback => {
  User.findAll()
  .then(users => {
    callback(users);
  })
  .catch(err => {
    console.log(err);
  });
};

const findOne = (query, callback) => {
  User.findOne(query)
  .done(user => {
    callback(user);
  });
};

const isLoggedIn = req => {
  req.session ? !!req.session.email : false;
};

exports.checkAuth = (req, res, next) => {
  if (!isLoggedIn(req) && 
      !(req.url.indexOf('/signin') >= 0) && 
      !(req.url.indexOf('/signup') >= 0)) {
    console.log('Redirecting to /signin');
    res.redirect('/signin');
  } else {
    console.log('Executing next() after checkAuth()');
    next();
  }
};

exports.createSession = (req, res, newUser, response) => {
  req.session.regenerate(() => {
    req.session.email = newUser.email;
    req.session.password = newUser.password;
    res.send(response);
  });
};


exports.comparePassword = comparePassword;
exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
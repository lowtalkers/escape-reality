var Like = require('../models/index.js').Like;

var create = function(props, callback) {
  Like.build(props)
  .save()
  .then(function(like) {
    callback(like);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  Like.findAll().then(function(likes) {
    callback(likes);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(query, callback) {
  Like.findOne(query).done(function(like) {
    console.log('🍊  Found one like in db:', query);
    callback(like);
  });
};

var findOrCreate = function(query, callback) {
  Like.findOrCreate(query).done(function(like) {
    console.log('🍊  Found one like in db:', query);
    callback(like);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
exports.findOrCreate = findOrCreate;
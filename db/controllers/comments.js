var Comment = require('../models/index.js').Comment;

var create = function(props, callback) {
  Comment.build(props)
  .save()
  .then(function(comment) {
    callback(comment);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  Comment.findAll().then(function(comments) {
    callback(comments);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(query, callback) {
  Comment.findOne(query).done(function(comment) {
    console.log('🍊  Found one comment in db:', query);
    callback(comment);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
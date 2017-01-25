var Comment = require('../models/index.js').Comment;

var create = function(props, callback) {
  Comment.build(props)
  .save()
  .then(function(comment) {
    callback(comment);
  }).catch(function(err) {
    // console.log(err);
  });
};

var findAll = function(query, callback) {
  Comment.findAll(query).then(function(comments) {
    callback(comments);
  }).catch(function(err) {
    // console.log(err);
  });
};

var findOne = function(query, callback) {
  Comment.findOne(query).done(function(comment) {
    // console.log('🍊  Found one comment in db:', query);
    callback(comment);
  });
};

var findOrCreate = function(query, callback) {
  Comment.findOrCreate(query).done(function(comment) {
    // console.log('🍊  Found one comment in db:', query);
    callback(comment);
  });
};

var destroyComments = function(query, callback) {
  Comment.destroy(query).done(function(comment) {
    // console.log('Yo yo destruction enabled');
    callback(comment);
  })
}

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
exports.findOrCreate = findOrCreate;
exports.destroyComments = destroyComments;

var Bookmark = require('../models/index.js').Bookmark;

var create = function(props, callback) {
  Bookmark.build(props)
  .save()
  .then(function(bookmark) {
    callback(bookmark);
  }).catch(function(err) {
    // console.log(err);
  });
};

var findAll = function(callback) {
  Bookmark.findAll().then(function(bookmarks) {
    callback(bookmarks);
  }).catch(function(err) {
    // console.log(err);
  });
};

var findOne = function(query, callback) {
  Bookmark.findOne(query).done(function(bookmark) {
    // console.log('🍊  Found one bookmark in db:', query);
    callback(bookmark);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
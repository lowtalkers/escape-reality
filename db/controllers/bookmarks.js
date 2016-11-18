var Bookmark = require('../models/index.js').Bookmark;

var create = function(props, callback) {
  Bookmark.build(props)
  .save()
  .then(function(bookmark) {
    callback(user);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  Bookmark.findAll().then(function(bookmarks) {
    callback(bookmarks);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(query, callback) {
  Bookmark.findAll(query).done(function(bookmarks) {
      callback(bookmarks[0]);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
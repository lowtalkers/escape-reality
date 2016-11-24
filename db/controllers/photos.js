var Photo = require('../models/index.js').Photo;

var create = function(props, callback) {
  Photo.build(props)
  .save()
  .then(function(photo) {
    callback(photo);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  console.log('in find all photo controller');
  Photo.findAll({ limit: 10, order: [['createdAt', 'DESC']]}).then(function(photos) {
    callback(photos);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(query, callback) {
  Photo.findOne(query).done(function(photo) {
    console.log('🍊  Found one photo in db:', query);
    callback(photo);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
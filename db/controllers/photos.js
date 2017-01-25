const Photo = require('../models/index.js').Photo;

const create = (props, callback) => {
  Photo.build(props)
  .save()
  .then(photo => {
    callback(photo);
  }).catch(err => {
    // console.log('🍊  Error in create photo', err);
  });
};

const findAll = callback => {
  // console.log('🍊  Running findAll query in photos controller');
  Photo.findAll({ 
    limit: 30, 
    order: [['createdAt', 'DESC']]
  })
  .then(photos => {
    callback(photos);
  }).catch(err => {
    // console.log('🍊  Error in find all photos', err);
  });
};

const findOne = (query, callback) => {
  Photo.findOne(query)
  .done(photo => {
    // console.log('🍊  Found one photo in db:', query);
    callback(photo);
  });
};


exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
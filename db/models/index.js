// This file makes all join table relationships
const db = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db, dbUser, dbPassword, {
  dialect: 'mariadb',
  host: dbHost
});

// Any variable that starts with a capital letter is a model
const User = require('./users.js')(sequelize, Sequelize);
const Bookmark = require('./bookmarks.js')(sequelize, Sequelize);
const BookmarkUsers = require('./bookmarkUsers')(sequelize, Sequelize);
const Photo = require('./photos.js')(sequelize, Sequelize);
const Comment = require('./comments.js')(sequelize, Sequelize);
const Like = require('./likes.js')(sequelize, Sequelize);

// BookmarkUsers join table:
User.belongsToMany(Bookmark, {
  through: 'bookmark_users',
  foreignKey: 'user_id'
});

Bookmark.belongsToMany(User, {
  through: 'bookmark_users',
  foreignKey: 'bookmark_id'
});

//Photos and Users
User.hasMany(Photo, {
  foreignKey: 'user_id'
});

Photo.belongsTo(User, {
  foreignKey: 'user_id'
});

// Comments
User.belongsToMany(Photo, {
  through: 'comments',
  foreignKey: 'user_id'
});

Photo.belongsToMany(User, {
  through: 'comments',
  foreignKey: 'photo_id'
});

// Likes
User.belongsToMany(Photo, {
  through: 'likes',
  foreignKey: 'user_id'
});

Photo.belongsToMany(User, {
  through: 'likes',
  foreignKey: 'photo_id'
});

//Create missing tables, if any
// sequelize.sync({force: true});
sequelize.sync();


exports.User = User;
exports.Bookmark = Bookmark;
exports.BookmarkUsers = BookmarkUsers;
exports.Photo = Photo;
exports.Comment = Comment;
exports.Like = Like;
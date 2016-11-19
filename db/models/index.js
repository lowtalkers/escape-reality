// This file makes all join table relationships
var Sequelize = require('sequelize');
var sequelize = new Sequelize('escape', 'escape', 'escapeacft', {
  dialect: 'mariadb',
  host: 'localhost'
});

// Any vairable that starts with a capital letter is a model
var User = require('./users.js')(sequelize, Sequelize);
var Bookmark = require('./bookmarks.js')(sequelize, Sequelize);
var BookmarkUsers = require('./bookmarkUsers')(sequelize, Sequelize);

// BookmarkUsers join table:
User.belongsToMany(Bookmark, {
  through: 'bookmark_users',
  foreignKey: 'user_id'
});

Bookmark.belongsToMany(User, {
  through: 'bookmark_users',
  foreignKey: 'bookmark_id'
});


// sequelize.sync({force: true});
sequelize.sync();

exports.User = User;
exports.Bookmark = Bookmark;
exports.BookmarkUsers = BookmarkUsers;

// This file makes all join table relationships
const database = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database, dbUser, dbPassword, {
  dialect: 'mariadb',
  host: dbHost
});

// Any vairable that starts with a capital letter is a model
const User = require('./users.js')(sequelize, Sequelize);
const Bookmark = require('./bookmarks.js')(sequelize, Sequelize);
const BookmarkUsers = require('./bookmarkUsers')(sequelize, Sequelize);

// BookmarkUsers join table:
User.belongsToMany(Bookmark, {
  through: 'bookmark_users',
  foreignKey: 'user_id'
});

Bookmark.belongsToMany(User, {
  through: 'bookmark_users',
  foreignKey: 'bookmark_id'
});

//Create missing tables, if any
// sequelize.sync({force: true});
sequelize.sync();


exports.User = User;
exports.Bookmark = Bookmark;
exports.BookmarkUsers = BookmarkUsers;
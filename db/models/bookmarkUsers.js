module.exports = function(sequelize, Sequelize) {

  var BookmarkUsers = sequelize.define('bookmark_users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    }
  });

  return BookmarkUsers;
}
module.exports = function(sequelize, Sequelize) {

  var User = sequelize.define('bookmarks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    paragraph: {
      type: Sequelize.TEXT
    },
    image: {
      type: Sequelize.TEXT
    }
  });

  return User;
}
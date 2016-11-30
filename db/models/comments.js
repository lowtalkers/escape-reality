module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    coordinates: {
      type: Sequelize.STRING
    }
  });

  return Comment;
};
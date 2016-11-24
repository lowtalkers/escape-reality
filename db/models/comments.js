module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    body: {
      type: Sequelize.STRING
    }
  });

  return Comment;
};
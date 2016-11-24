module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define('likes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    }
  });

  return Like;
};
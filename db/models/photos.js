module.exports = (sequelize, Sequelize) => {
  const Photo = sequelize.define('photos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    imageLink: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Photo;
};
module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define('likes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    like: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Like;

};

//find user id and find like where user id is equal to user id
module.exports = function (sequelize, DataTypes) {
  const Dislikes = sequelize.define('Dislikes');
  Dislikes.associate = function (models) {
    Dislikes.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'User',
    });
    Dislikes.belongsTo(models.Posts, {
      foreignKey: 'PostId',
      as: 'Post',
    });
  };
  return Dislikes;
};

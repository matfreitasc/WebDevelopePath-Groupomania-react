module.exports = function (sequelize, DataTypes) {
  const Likes = sequelize.define('Likes');
  Likes.associate = function (models) {
    Likes.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'User',
    });
    Likes.belongsTo(models.Posts, {
      foreignKey: 'PostId',
      as: 'Post',
    });
  };

  return Likes;
};

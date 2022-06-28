module.exports = function (sequelize, DataTypes) {
  const Comments = sequelize.define('Comments', {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Comments.associate = function (models) {
    Comments.belongsTo(models.Posts, {
      onDelete: 'CASCADE',
    });
    Comments.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
  };

  return Comments;
};

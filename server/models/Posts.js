module.exports = function (sequelize, DataTypes) {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Posts.associate = function (models) {
    Posts.hasMany(models.Comments, {
      onDelete: 'CASCADE',
    });
    Posts.hasMany(models.Likes, {
      onDelete: 'CASCADE',
    });
  };

  return Posts;
};

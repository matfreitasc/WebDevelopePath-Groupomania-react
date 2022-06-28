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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Posts.associate = function (models) {
    Posts.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
    Posts.hasMany(models.Comments, {
      onDelete: 'CASCADE',
    });
    Posts.hasMany(models.Likes, {
      onDelete: 'CASCADE',
    });
    Posts.hasMany(models.Dislikes, {
      onDelete: 'CASCADE',
    });
    Posts.hasMany(models.Viewes, {
      onDelete: 'CASCADE',
    });
  };

  return Posts;
};

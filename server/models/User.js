module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Likes, {
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Dislikes, {
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Viewes, {
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Posts, {
      onchange: 'CASCADE',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Comments, {
      onchange: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return User;
};

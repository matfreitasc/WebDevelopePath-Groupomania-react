module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
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
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    darkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Users.associate = function (models) {
    Users.hasMany(models.Likes, {
      onDelete: 'CASCADE',
    });
    Users.belongsToMany(models.Roles, {
      onDelete: 'CASCADE',
    });
  };

  return Users;
};

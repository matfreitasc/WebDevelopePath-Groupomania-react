module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    Role_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Role_Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      constraints: false,
      as: 'users',
    });
    Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      as: 'permissions',
      foreignKey: 'roleId',
    });
  };
  return Role;
};

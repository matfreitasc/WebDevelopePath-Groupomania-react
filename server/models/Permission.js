module.exports = function (sequelize, DataTypes) {
  const Permission = sequelize.define('Permission', {
    Perm_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Perm_Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Permission.associate = function (models) {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermissions',
      as: 'roles',
      foreignKey: 'permId',
    });
  };

  return Permission;
};

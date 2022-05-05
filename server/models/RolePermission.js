module.exports = function (sequelize, DataTypes) {
  const RolePermission = sequelize.define('RolePermission', {
    Role_Id: {
      type: DataTypes.INTEGER,
      defaultValue: 2001,
    },
    Perm_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  RolePermission.associate = function (models) {
    RolePermission.belongsTo(models.Role, {
      foreignKey: 'Role_Id',
      as: 'role',
    });
    RolePermission.belongsTo(models.Permission, {
      foreignKey: 'Perm_Id',
      as: 'permission',
    });
  };
  return RolePermission;
};

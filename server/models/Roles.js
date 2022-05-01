module.exports = function (sequelize, DataTypes) {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Roles;
};

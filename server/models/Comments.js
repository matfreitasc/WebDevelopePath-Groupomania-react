module.exports = function (sequelize, DataTypes) {
  const Comments = sequelize.define('Comments', {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};

const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return userModel;
};

User.associate = (models) => {
  models.User.hasOne('BlogPosts', { foreignKey: 'id', as: 'userId' });
};

module.exports = User;

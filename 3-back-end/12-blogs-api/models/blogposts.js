const BlogPosts = (sequelize, DataTypes) => {
  const BlogPostsModel = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, {
    timestamps: false,
  });

  return BlogPostsModel;
};

BlogPosts.associate = (models) => {
  models.BlogPosts.hasOne(models.PostCategories, { foreignKey: 'id', as: 'postId' });
  models.BlogPosts.belongsTo(models.User, { foreignKey: 'id', as: 'userId' });
};

module.exports = BlogPosts;

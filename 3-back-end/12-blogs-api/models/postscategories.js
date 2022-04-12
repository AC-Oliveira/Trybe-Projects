const PostsCategories = (sequelize, DataTypes) => {
  const PostCategoriesModel = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
  }, {
    timestamps: false,
  });

  return PostCategoriesModel;
};

PostsCategories.associate = (models) => {
  models.PostsCategories.belongsToMany(models.BlogPosts, { 
    as: 'BlogPosts',
    through: PostsCategories,
    foreignKey: 'postId',
    other: 'categoryId',
  });
  models.PostsCategories.belongsToMany(models.Categories, { 
    as: 'Categories',
    through: PostsCategories,
    foreignKey: 'categoryId',
    other: 'postId',
  });
};

module.exports = PostsCategories;

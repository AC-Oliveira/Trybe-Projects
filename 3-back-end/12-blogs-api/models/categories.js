const Categories = (sequelize, DataTypes) => {
  const CategoriesModel = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return CategoriesModel;
};

Categories.associate = (models) => {
  models.Categories.hasOne(models.PostCategories, { foreignKey: 'id', as: 'categoryId' });
};

module.exports = Categories;

const { PostsCategories } = require('../models');

const createPostCategoriesInDB = async (categoryIds, postId) => {
   await categoryIds.forEach(
    async (categoryId) => {
      await PostsCategories.create({ postId, categoryId });
    },
  );
};

const getAllPostCategoriesInDb = async () => {
  const allPostCategories = await PostsCategories.findAll();
  return allPostCategories;
};

module.exports = { createPostCategoriesInDB, getAllPostCategoriesInDb };
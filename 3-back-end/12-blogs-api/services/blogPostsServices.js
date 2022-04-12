const { BlogPosts } = require('../models');
const utils = require('./utils/utils');
const { getAllCategoriesInDB } = require('./categoriesServices');
const postsCategoriesServices = require('./postsCategoriesServices');
const { findAllUsers } = require('./userServices');

const createPostInDB = async (token, post) => {
  utils.verifyBlogPost(post);

  const allCategories = await getAllCategoriesInDB(token);
  utils.verifyCategoryIds(post.categoryIds, allCategories);

  const aux = { ...post };
  delete aux.categoryIds;
  const { dataValues } = await BlogPosts.create({ ...aux });

  const { categoryIds } = post;
  const { id: postId } = dataValues;
  await postsCategoriesServices.createPostCategoriesInDB(categoryIds, postId);

  return dataValues;
};

const getAllBlogPostsInDB = async (token) => {
  utils.verifyToken(token);
  const allUsers = await findAllUsers(token);
  const allPosts = await BlogPosts.findAll();
  const allPostCategories = await postsCategoriesServices.getAllPostCategoriesInDb();
  const allCategories = await getAllCategoriesInDB(token);

  for (let index = 0; index < allPosts.length; index += 1) {
    const { userId, id: postId, published, updated } = allPosts[index];
    allPosts[index].dataValues.published = new Date(published).toISOString();
    allPosts[index].dataValues.updated = new Date(updated).toISOString();

    const user = allUsers.find((searchedUser) => searchedUser.id === userId);
    if (user) allPosts[index].dataValues.user = user;

    const categoryIds = utils.blogPostCategoriesGen(postId, allPostCategories, allCategories);
    allPosts[index].dataValues.categories = categoryIds;
  }
  
  return allPosts;
};

module.exports = { createPostInDB, getAllBlogPostsInDB };

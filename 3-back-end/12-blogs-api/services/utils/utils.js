const { User } = require('../../models');
const CustomError = require('../../errors/customError');
const userErrors = require('../../errors/userErrors');
const tokenErrors = require('../../errors/tokenErrors');
const blogPostsErrors = require('../../errors/blogPostsErrors');

const emailExistsInDB = async (email) => {
  const allUsers = await User.findAll();
  const userExists = allUsers.some((user) => user.email === email);
  return userExists;
};

const verifyEmailValidity = (email) => {
  if (!email) throw new CustomError(userErrors.emailRequired);
  const regEx = /.{1,}@.{1,}/;
  const isValid = regEx.test(email);
  if (!isValid) throw new CustomError(userErrors.invalidEmail);
};

const displayNameVeriFy = (name) => {
  const nameIsInvaalid = name.length < 8;
  if (nameIsInvaalid) throw new CustomError(userErrors.displayNameLengthInvalid);
};

const verifyPassword = (password) => {
  if (!password) throw new CustomError(userErrors.passwordRequired);
  const passwordHasLengthSix = password.length === 6;
  if (!passwordHasLengthSix) throw new CustomError(userErrors.invalidPasswordLength);
};

const verifyToken = (token) => {
  if (!token) throw new CustomError(tokenErrors.tokenNotFound);
  if (token.length < 355) throw new CustomError(tokenErrors.invalidToken);
};

const verifyCategoryIds = (postIds, validIds) => {
  let isValid = true;
  postIds.forEach((id) => {
    isValid = validIds.some((category) => category.id === id);
    if (!isValid) throw new CustomError(blogPostsErrors.categoryIdNotFound);
  });
};

const verifyBlogPost = (blogPost) => {
  if (!blogPost.title) throw new CustomError(blogPostsErrors.titleRequired);
  if (!blogPost.content) throw new CustomError(blogPostsErrors.contentRequired);
  if (!blogPost.categoryIds) throw new CustomError(blogPostsErrors.categoryIdsRequired);
};

const blogPostCategoriesGen = (postId, allPostCategories, allCategories) => {
  const categoriesIdsAndNames = allPostCategories
  .filter((postAndCategoryId) => postAndCategoryId.postId === postId)
  .map((postAndCategoryId) => allCategories
    .find((category) => category.id === postAndCategoryId.postId));

  return categoriesIdsAndNames;
};

module.exports = {
  emailExistsInDB,
  verifyEmailValidity,
  displayNameVeriFy,
  verifyPassword,
  verifyToken,
  verifyBlogPost,
  verifyCategoryIds,
  blogPostCategoriesGen,
};
const StatusCodes = require('http-status-codes');
const { decryptToken } = require('../auth/token');
const blogPostsServices = require('../services/blogPostsServices');
const { verifyToken } = require('../services/utils/utils');

const createBlogPost = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const { body: post } = req;
  try {
    const date = new Date();

    verifyToken(token);
    const { user: { id: userId } } = decryptToken(token);
    const result = await blogPostsServices
    .createPostInDB(token, { ...post, userId, published: date, updated: date });
    delete result.updated;
    delete result.published;
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllBlogPosts = async (req, res, next) => {
  const { authorization: token } = req.headers;
  try {
    const allPosts = await blogPostsServices.getAllBlogPostsInDB(token);
    res.status(StatusCodes.OK).json(allPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlogPost, getAllBlogPosts };
const express = require('express');
const blogPostsControllers = require('../controllers/blogPostsControllers');

const route = express.Router();

route.post('/', blogPostsControllers.createBlogPost);
route.get('/', blogPostsControllers.getAllBlogPosts);

module.exports = route;
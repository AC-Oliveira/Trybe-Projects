const express = require('express');
const categoriesControllers = require('../controllers/categoriesControllers');

const route = express.Router();

route.post('/', categoriesControllers.createCategory);
route.get('/', categoriesControllers.getAllCategories);

module.exports = route;
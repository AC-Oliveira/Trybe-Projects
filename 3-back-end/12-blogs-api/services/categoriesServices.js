const categoriesErrors = require('../errors/categoriesErrors');
const CustomError = require('../errors/customError');
const { Categories } = require('../models');
const utils = require('./utils/utils');

const createCategoryInDB = async (token, name) => {
  utils.verifyToken(token);
  if (!name) throw new CustomError(categoriesErrors.nameRequired);
  const { dataValues } = await Categories.create({ name });
  return dataValues;
};

const getAllCategoriesInDB = async (token) => {
  utils.verifyToken(token);
  const allCategories = await Categories.findAll();
  return allCategories;
};

module.exports = { createCategoryInDB, getAllCategoriesInDB };
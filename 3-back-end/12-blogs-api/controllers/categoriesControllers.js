const StatusCodes = require('http-status-codes');
const categoriesServices = require('../services/categoriesServices');

const createCategory = async (req, res, next) => {
  const { body: { name }, headers: { authorization: token } } = req;
  try {
    const categoryCreated = await categoriesServices.createCategoryInDB(token, name);
    res.status(StatusCodes.CREATED).json(categoryCreated);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    const allCategories = await categoriesServices.getAllCategoriesInDB(token);
    res.status(StatusCodes.OK).json(allCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory, getAllCategories };
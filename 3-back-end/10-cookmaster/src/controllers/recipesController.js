const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const createRecipe = async (req, res, next) => {
  try {
    const recipe = req.body;
    const { authorization } = req.headers;
    const result = await recipesService.createRecipe(recipe, authorization);
    res.status(201).send({ recipe: { _id: result, ...recipe } });
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const result = await recipesService.getAllRecipes();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSpecificRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await recipesService.findRecipeById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { params: { id }, body: recipe, user: { _id } } = req;

    await recipesService.updateRecipe(id, recipe);

    res.status(200).json({ _id: id, ...recipe, userId: _id });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    await recipesService.deleteRecipe(id);
    res.status(204).json({ id });
  } catch (error) {
    next(error);
  }
};

const updateRecipeImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { filename } = req.file;
    await recipesModel.updateRecipeImageById(id, filename);
    const result = await recipesService.findRecipeById(id);
    result.userId = _id;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getSpecificRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};

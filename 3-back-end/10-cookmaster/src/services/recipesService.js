const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const errorHandler = (status, message) => ({ status, message });

const createRecipe = async (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) throw errorHandler(400, 'Invalid entries. Try again.');
  const result = await recipesModel.createRecipes(recipe);
  return result;
};

const getAllRecipes = async () => {
  const result = await recipesModel.findAllRecipes();
  return result;
};

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');
  const result = await recipesModel.findRecipeById(id);
  return result;
};

const updateRecipe = async (id, recipe) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');

  const { result } = await recipesModel.updateRecipeById(id, recipe);
  return result;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');

  const { result } = await recipesModel.deleteRecipeById(id);
  return result;
};

module.exports = { createRecipe, getAllRecipes, findRecipeById, updateRecipe, deleteRecipe };
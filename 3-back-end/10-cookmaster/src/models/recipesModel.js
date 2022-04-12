const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'recipes';

const createRecipes = async (recipe) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertOne(recipe);
  return insertedId;
};

const findAllRecipes = async () => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).find({}).toArray();
  return result;
};

const findRecipeById = async (id) => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return result;
};

const updateRecipeById = async (id, recipe) => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) }, { $set: recipe },
  );
  return result;
};

const deleteRecipeById = async (id) => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
  return result;
};

const updateRecipeImageById = async (id, filename) => {
  const conn = await connect();
  await conn.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) }, { $set: { image: `localhost:3000/src/uploads/${filename}` } },
  );
};

module.exports = {
  createRecipes,
  findAllRecipes,
  findRecipeById,
  updateRecipeById,
  deleteRecipeById,
  updateRecipeImageById,
};

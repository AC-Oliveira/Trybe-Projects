const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'products';

const createProducts = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertOne({ name, quantity });
  return insertedId;
};

const findProductByName = async (name) => {
  const conn = await connect();
  const queryResult = await conn.collection(DB_COLLECTION).findOne(name);
  return queryResult;
};

const findAllProducts = async () => {
  const conn = await connect();
  const allProducts = await conn.collection(DB_COLLECTION).find().toArray();
  return allProducts;
};

const findProductByID = async (id) => {
  const conn = await connect();
  const searchedProductByID = await conn.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return searchedProductByID;
};

const updateProduct = async (id, updateInfo) => {
  const conn = await connect();
  await conn
  .collection(DB_COLLECTION).updateOne({ _id: ObjectId(id) }, { $set: { ...updateInfo } });
};

const deleteProduct = async (id) => {
  const conn = await connect();
  await conn.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

module.exports = { 
  createProducts,
  findProductByName,
  findAllProducts,
  findProductByID,
  updateProduct,
  deleteProduct,
};
const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'sales';

const createSale = async (itensSold) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertOne({ itensSold });
  return insertedId;
};

const getSales = async () => {
  const conn = await connect();
  const allSales = await conn.collection(DB_COLLECTION).find().toArray();
  return allSales;
};

const getSaleByID = async (id) => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).find({ _id: ObjectId(id) }).toArray();
  return result;
};

const updateSale = async (id, newSale) => {
  const conn = await connect();
  await conn.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: newSale } });
};

const deleteSale = async (id) => {
  const conn = await connect();
  await conn.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createSale,
  getSales,
  getSaleByID,
  updateSale,
  deleteSale,
};

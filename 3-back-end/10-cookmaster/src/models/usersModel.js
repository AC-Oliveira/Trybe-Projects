const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'users';

const createUser = async (user) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertOne(user);
  return insertedId;
};

const findUser = async (email) => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).findOne({ email });
  return result;
};

const findUserById = async (id) => {
  const conn = await connect();
  const result = await conn.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = { createUser, findUser, findUserById };

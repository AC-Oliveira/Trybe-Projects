const mongodb = require('mongodb').MongoClient;

require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

let db = null;

const connection = () => (db ? Promise.resolve(db) : mongodb.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = connection;
require('dotenv/config');
const jwt = require('jsonwebtoken');

const SECRET = '1234';

const generateToken = (user) => {
  const jwtConfig = { algorithm: 'HS256' };
  const token = jwt.sign({ user }, SECRET, jwtConfig);
  return token;
};

const decryptToken = (token) => {
  const user = jwt.verify(token, SECRET);
  return user;
};

module.exports = { generateToken, decryptToken };
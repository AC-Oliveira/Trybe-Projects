const express = require('express');
const { login } = require('../controllers/loginControllers');

const route = express.Router();

route.post('/', login);

module.exports = route;
const express = require('express');
const usersController = require('../controllers/usersControllers');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserByID);
router.post('/', usersController.createNewUser);

module.exports = router;
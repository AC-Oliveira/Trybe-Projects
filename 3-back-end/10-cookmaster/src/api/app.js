const express = require('express');
const path = require('path');
const multer = require('multer');

const errorMiddleware = require('../../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');

const login = require('../controllers/login');

const validateJWT = require('./auth/validateJWT');

const app = express();

const directory = path.resolve(__dirname, '..', 'uploads');

app.use('/images', express.static(directory));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, directory),
  filename: (req, file, cb) => cb(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

app.use(express.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);

app.post('/login', login);

app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getSpecificRecipe);

// app.get('/images/:id', recipesController.getRecipeImage);

app.post('/recipes', validateJWT, recipesController.createRecipe);

app.put('/recipes/:id/image', upload
  .single('image'), validateJWT, recipesController.updateRecipeImage);

app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);

module.exports = app;

app.use(errorMiddleware);

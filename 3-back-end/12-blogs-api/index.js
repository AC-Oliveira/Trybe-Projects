const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const blogPostsRoutes = require('./routes/blogPostsRoutes');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);

app.use('/login', loginRoutes);

app.use('/categories', categoriesRoutes);

app.use('/post', blogPostsRoutes);

app.use(errorMiddleware);

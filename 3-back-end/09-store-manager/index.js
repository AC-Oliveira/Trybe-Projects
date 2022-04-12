const express = require('express');
const errorMidleware = require('./middlewares/errorMiddleware');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Server is running on port 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createProduct);

app.get('/products', productController.getAllProducts);

app.get('/products/:id', productController.getProductByID);

app.put('/products/:id', productController.updateProductByID);

app.delete('/products/:id', productController.deleteProductByID);

app.post('/sales', saleController.createSale);

app.get('/sales', saleController.getAllSales);

app.get('/sales/:id', saleController.getSaleByID);

app.put('/sales/:id', saleController.updateSaleByID);

app.delete('/sales/:id', saleController.deleteSaleById);

app.use(errorMidleware);

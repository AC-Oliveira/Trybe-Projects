const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const errorHandler = (status, code, message) => ({ err: { status, code, message } });

const nameIsValid = (name) => {
  if (!name) throw errorHandler(422, 'invalid_data', 'name and quantity are required');
  if (name.length < 5) {
   throw errorHandler(422, 'invalid_data', '"name" length must be at least 5 characters long');
  }
};

const quantityIsValid = (quantity) => {
  if (!quantity && quantity !== 0) {
    throw errorHandler(422, 'invalid_data', 'name and quantity are required'); 
  }
  if (quantity < 1) {
    throw errorHandler(422, 'invalid_data', '"quantity" must be larger than or equal to 1'); 
  }
  if (!Number.isInteger(quantity)) {
    throw errorHandler(422, 'invalid_data', '"quantity" must be a number'); 
  }
};

const createProduct = async (name, quantity) => {
  quantityIsValid(quantity);
  nameIsValid(name);
  const productExists = await productModel.findProductByName({ name });
  if (productExists) throw errorHandler(422, 'invalid_data', 'Product already exists');
  const productID = await productModel.createProducts(name, quantity);
  return productID;
};

const findAllProducts = async () => {
  const products = await productModel.findAllProducts();
  return products;
};

const findProductByID = async (id) => {
    if (ObjectId.isValid(id)) {
      const specificProduct = await productModel.findProductByID(id);
      return specificProduct;
    }
    throw errorHandler(422, 'invalid_data', 'Wrong id format');
};

const updateProductByID = async (id, name, quantity) => {
  nameIsValid(name);
  quantityIsValid(quantity);
  if (!ObjectId.isValid(id)) throw errorHandler(422, 'invalid_data', 'Wrong id format');
  const productExists = await findProductByID(id);
  if (!productExists) throw errorHandler(422, 'invalida_data', 'id not found');
  await productModel.updateProduct(id, { name, quantity });
};

const deleteProductByID = async (id) => {
  const productExists = await findProductByID(id);
  if (!productExists) throw errorHandler(422, 'invalida_data', 'id not found');
  await productModel.deleteProduct(id);
};

module.exports = { 
  createProduct,
  findAllProducts,
  findProductByID,
  updateProductByID,
  deleteProductByID,
};

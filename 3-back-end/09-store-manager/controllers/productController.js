const productService = require('../services/productService');

const createProduct = async (req, res, next) => {
  try {
  const { name, quantity } = req.body;
  const productID = await productService.createProduct(name, quantity);
  res.status(201).json({ _id: productID, name, quantity });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.findAllProducts();
  res.status(200).json({ products: allProducts });
};

const getProductByID = async (req, res, next) => {
  const { params } = req;
  try {
    const specificProduct = await productService.findProductByID(params.id);
    res.status(200).json(specificProduct);
  } catch (error) {
    next(error);
  }
};

const updateProductByID = async (req, res, next) => {
  const { params: { id } } = req;
  const { name, quantity } = req.body;
  try {
    await productService.updateProductByID(id, name, quantity);
    res.status(200).json({ name, quantity });
  } catch (error) {
    next(error);
  }
};

const deleteProductByID = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    await productService.deleteProductByID(id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};

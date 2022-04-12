const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');

const errorHandler = (status, code, message) => ({ err: { status, code, message } });

const quantityIsValid = (quantity) => {
  if (!Number.isInteger(quantity)) {
    throw errorHandler(422, 'invalid_data', 'Wrong product ID or invalid quantity');
  }
  if (quantity < 1) {
    throw errorHandler(422, 'invalid_data', 'Wrong product ID or invalid quantity'); 
  }
};

const createSale = async (itensSold) => {
  itensSold.forEach((item) => quantityIsValid(item.quantity));
  const id = await saleModel.createSale(itensSold);
  return id;
};

const getAllSales = async () => {
  const allSales = await saleModel.getSales();
  return allSales;
};

const getSaleByID = async (id) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'not_found', 'Sale not found');
  const result = await saleModel.getSaleByID(id);
  if (!result.length) throw errorHandler(404, 'not_found', 'Sale not found');
  console.log(result);
  return result;
};

const updateSaleByID = async (id, newSale) => {
  const { quantity } = newSale;
  quantityIsValid(quantity);
  await saleModel.updateSale(id, newSale);
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw errorHandler(422, 'invalid_data', 'Wrong sale ID format');
  await saleModel.deleteSale(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByID,
  updateSaleByID,
  deleteSaleById,
};

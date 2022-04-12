const saleService = require('../services/saleService');

const createSale = async (req, res, next) => {
  const itensSold = req.body;
  try {
    const id = await saleService.createSale(itensSold);
    res.status(200).json({ _id: id, itensSold });
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (_req, res) => {
  const allSales = await saleService.getAllSales();
  res.status(200).json({ sales: allSales });
};

const getSaleByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await saleService.getSaleByID(id);
    res.status(200).json({ sales: result });
  } catch (error) {
    next(error);
  }
};

const updateSaleByID = async (req, res, next) => {
  const { body, params: { id } } = req;
  try {
    await saleService.updateSaleByID(id, body[0]);
    res.status(200).json({ _id: id, itensSold: body });
  } catch (error) {
    next(error);
  }
};

const deleteSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
   await saleService.deleteSaleById(id);
   res.status(200).json({ message: 'Sale deleted' });
 } catch (error) {
   next(error);
 }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByID,
  updateSaleByID,
  deleteSaleById,
};

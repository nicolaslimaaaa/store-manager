const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/', saleController.getAllSales);
route.get('/:id', saleController.getSaleById);
route.post('/', saleController.postSale);
route.delete('/:id', saleController.deleteSale);

module.exports = route;
const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/', saleController.getAllSales);
route.get('/:id', saleController.getSaleById);

module.exports = route;
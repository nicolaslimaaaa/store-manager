const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProductName } = require('../middlewares/validateProductName');

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductById);
route.post('/', validateProductName, productController.postProduct);

module.exports = route;
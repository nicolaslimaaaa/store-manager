const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProductName } = require('../middlewares/validateProductName');

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductById);
route.post('/', validateProductName, productController.postProduct);
route.put('/:id', validateProductName, productController.updateNameProduct);
route.delete('/:id', productController.deleteProduct);

module.exports = route;
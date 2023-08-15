const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (req, res) => {
    const { status, data } = await productService.getAllProducts();
    return res.status(mapStatusHTTP(status)).json(data);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productService.getProductById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

const postProduct = async (req, res) => {
    const product = req.body;
    const { status, data } = await productService.postProduct(product);

    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
};
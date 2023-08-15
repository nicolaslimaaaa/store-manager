const { productModel } = require('../models');

const getAllProducts = async () => {
    const products = await productModel.findAll();

    return { status: 'SUCCESSFUL', data: products };
};

const getProductById = async (id) => {
    const product = await productModel.findById(id);

    if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

    return { status: 'SUCCESSFUL', data: product };
};

const postProduct = async (product) => {
    const productId = await productModel.insert(product);

    return { status: 'CREATED', data: { id: productId, ...product } };
};

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
};
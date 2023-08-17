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

const updateNameProduct = async (id, product) => {
    const productExists = await productModel.findById(id);

    if (!productExists) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }

    await productModel.update(id, product);

    return { status: 'SUCCESSFUL', data: { id, ...product } };
};

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    updateNameProduct,
};
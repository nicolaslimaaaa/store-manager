const schema = require('./validations/validationsInputsValuesSales');
const { saleModel } = require('../models');
const { findById } = require('../models/product.model');

const getAllSales = async () => {
    const sales = await saleModel.findAll();

    return { status: 'SUCCESSFUL', data: sales };
};

const getSaleById = async (id) => {
    const sale = await saleModel.findById(id);

    if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

    return { status: 'SUCCESSFUL', data: sale };
};

const postSale = async (sale) => {
    const error = schema.validatePostSale(sale);

    if (error) return { status: error.status, data: { message: error.message } }; 
    
    const products = await Promise.all(
        sale.map((item) => findById(item.productId)),
    );

    const product = products.every((item) => Boolean(item));
    if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

    const saleId = await saleModel.insert(sale);

    return { status: 'CREATED', data: { id: saleId, itemsSold: sale } };
};

module.exports = {
    getAllSales,
    getSaleById,
    postSale,
};
const schema = require('./validations/validationsInputsValuesSales');
const { saleModel, productModel } = require('../models');

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
        sale.map((item) => productModel.findById(item.productId)),
    );
    const product = products.every((item) => Boolean(item));
  
    if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

    const saleId = await saleModel.insert(sale);
        
    return { status: 'CREATED', data: { id: saleId, itemsSold: sale } };
};

const deleteSale = async (id) => {
    const saleExists = await saleModel.findById(id);
    
    if (!saleExists.length) {
        return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    }

    await saleModel.deleteById(id);

    return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
    getAllSales,
    getSaleById,
    postSale,
    deleteSale,
};
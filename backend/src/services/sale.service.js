const { saleModel } = require('../models');

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
    const saleId = await saleModel.insert(sale);

    return { status: 'CREATED', data: { id: saleId, itemsSold: sale } };
};

module.exports = {
    getAllSales,
    getSaleById,
    postSale,
};
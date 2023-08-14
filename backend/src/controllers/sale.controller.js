const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (req, res) => {
    const { status, data } = await saleService.getAllSales();
    return res.status(mapStatusHTTP(status)).json(data);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await saleService.getSaleById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getAllSales,
    getSaleById,
};
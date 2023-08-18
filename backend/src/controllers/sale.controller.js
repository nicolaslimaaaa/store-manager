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

const postSale = async (req, res) => {
    const sale = req.body;
    
    const { status, data } = await saleService.postSale(sale);
console.log(status, data, 'POSTSALESERVICE');
    return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;

    const { status, data } = await saleService.deleteSale(Number(id));
    
    return res.status(mapStatusHTTP(status)).json(data);
};

const updateQuantityProductBySale = async (req, res) => {
    const { saleId, productId } = req.params;
    const sale = req.body;

    const { status, data } = await saleService
        .updateQuantityProductBySale(Number(saleId), Number(productId), sale);

    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getAllSales,
    getSaleById,
    postSale,
    deleteSale,
    updateQuantityProductBySale,
};
const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
    const [sales] = await connection.execute(
        `SELECT
        s.date, sp.sale_id, sp.product_id, sp.quantity
        FROM sales s
        JOIN sales_products sp
        ON s.id = sp.sale_id
        ORDER BY sp.sale_id, sp.product_id;`,
    );

    return camelize(sales);
};

const findById = async (id) => {
    const [sale] = await connection.execute(
        `SELECT
        s.date, sp.product_id, sp.quantity
        FROM sales s
        JOIN sales_products sp
        ON s.id = sp.sale_id
        WHERE s.id = ?
        ORDER BY sp.sale_id, sp.product_id;`,
        [id],
    );

    return camelize(sale);
};

module.exports = {
    findAll,
    findById,
};
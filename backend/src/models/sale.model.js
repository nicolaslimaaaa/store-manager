const camelize = require('camelize');
const connection = require('./connection');
const {
    getFormattedColumnNames, getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

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

const insert = async (sale) => {
    const columns = getFormattedColumnNames(sale[0]);
    const newColumns = `${columns}, sale_id`;
    
    const placeholders = getFormattedPlaceholders(sale[0]);
    const newPlaceholders = `${placeholders}, ?`;
    const querySale = 'INSERT INTO sales (date) VALUE (NOW());';

    const [{ insertId }] = await connection.execute(querySale);
    
    const querySaleProduct = `INSERT INTO sales_products (${newColumns})
    VALUE (${newPlaceholders});`;

    Promise.all(sale
        .map((item) => connection
            .execute(querySaleProduct, [...Object.values(item), insertId])));
        
    return insertId;
};

module.exports = {
    findAll,
    findById,
    insert,
};
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

    await Promise.all(sale
        .map((item) => connection
            .execute(querySaleProduct, [...Object.values(item), insertId])));
        
    return insertId;
};

const deleteById = async (id) => {
    const query = 'DELETE FROM sales WHERE id = ?;';
    
    const saleDelete = await connection.execute(query, [id]); 
    
    return saleDelete;
};

const findBySaleIdAndProductId = async (saleId, productId) => {
    const [[sale]] = await connection.execute(
        `SELECT
        s.date, sp.product_id, sp.quantity
        FROM sales s
        JOIN sales_products sp
        ON s.id = sp.sale_id
        WHERE s.id = ? AND sp.product_id = ?
        ORDER BY sp.sale_id, sp.product_id;`,
        [saleId, productId],
    );

    return camelize(sale);
};

const update = async (saleId, productId, sale) => {
    const columns = getFormattedColumnNames(sale);
    const placeholders = getFormattedPlaceholders(sale);
    const query = `UPDATE sales_products
        SET ${columns}=${placeholders} WHERE sale_id = ? AND product_id = ?;`;

    const saleUpdate = await connection.execute(query, [...Object.values(sale), saleId, productId]);

    return saleUpdate;
};

module.exports = {
    findAll,
    findById,
    insert,
    deleteById,
    update,
    findBySaleIdAndProductId,
};
const salesFromDB = [
    {
      date: '2023-08-14T21:13:28.000Z',
      saleId: 1,
      productId: 1,
      quantity: 5,
    },
    {
      date: '2023-08-14T21:13:28.000Z',
      saleId: 1,
      productId: 2,
      quantity: 10,
    },
    {
      date: '2023-08-14T21:13:28.000Z',
      saleId: 2,
      productId: 3,
      quantity: 15,
    },
];

const salesFromDBById = {
    date: '2023-08-14T21:13:28.000Z',
    saleId: 2,
    productId: 3,
    quantity: 15,
};

const saleIdFromDB = { insertId: 3 };
const saleIdFromModel = 3;

module.exports = {
    salesFromDB,
    salesFromDBById,
    saleIdFromDB,
    saleIdFromModel,
};
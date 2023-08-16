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
];

const salesFromDBById = {
    date: '2023-08-14T21:13:28.000Z',
    saleId: 2,
    productId: 3,
    quantity: 15,
};

const salesFromModelById = [{
  date: '2023-08-14T21:13:28.000Z',
  saleId: 2,
  productId: 3,
  quantity: 15,
}];

const saleIdFromDB = { insertId: 3 };
const saleIdFromModel = 3;

const saleNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const saleWithoutProductId = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const erroSaleWithoutProductId = {
  status: 'BAD_REQUEST',
  message: '"productId" is required',
};

const saleWithoutQuantity = [
  {
    productId: 2,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const erroSaleWithoutQuantity = {
  status: 'BAD_REQUEST',
  message: '"quantity" is required',
};

const saleWithQuantityLessThanOrEqualToZero = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const erroSaleWithQuantityLessThanOrEqualToZero = {
  status: 'INVALID_VALUE',
  message: '"quantity" must be greater than or equal to 1',
};

module.exports = {
    salesFromDB,
    salesFromDBById,
    saleIdFromDB,
    saleIdFromModel,
    salesFromModelById,
    saleNotFound,
    saleWithoutProductId,
    erroSaleWithoutProductId,
    saleWithoutQuantity,
    erroSaleWithoutQuantity,
    saleWithQuantityLessThanOrEqualToZero,
    erroSaleWithQuantityLessThanOrEqualToZero,
};
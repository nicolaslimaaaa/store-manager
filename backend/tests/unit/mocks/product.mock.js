const productsFromDB = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do CapitÃ£o AmÃ©rica',
    },
  ];

const productFomDBById = {
    id: 1,
    name: 'Martelo de Thor',
};

const productNotFound = { status: 'NOT_FOUND', data: { message: 'Product not found' } };

module.exports = {
    productsFromDB,
    productFomDBById,
    productNotFound,
};
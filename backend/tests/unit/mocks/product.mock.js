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

const productsFromService = {
  status: 'SUCCESSFUL',
  data: productsFromDB,
};

const productFomDBById = {
    id: 1,
    name: 'Martelo de Thor',
};

const productFromService = {
  status: 'SUCCESSFUL',
  data: productFomDBById,
};

const productNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productIdFromDB = { insertId: 5 };
const productIdFromModel = 5;

const returnUpdateFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const returnDeleteFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

const returnDeleteFromService = {
  status: 'NO_CONTENT',
data: {},
};

const product = {
  name: 'ProdutoX',
};

const productPostFromService = {
  status: 'CREATED',
  data: productFomDBById,
};

module.exports = {
    productsFromDB,
    productFomDBById,
    productNotFound,
    productIdFromDB,
    productIdFromModel,
    productsFromService,
    returnUpdateFromDB,
    returnDeleteFromDB,
    returnDeleteFromService,
    productFromService,
    product,
    productPostFromService,
};
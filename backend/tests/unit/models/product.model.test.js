const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { productsFromDB, productFomDBById, productIdFromDB, productIdFromModel } = require('../mocks/product.mock');

describe('Realizando testes - PRODUCT MODEL:', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Será validado se é possível listar todos os produtos', async function () {
        sinon.stub(connection, 'execute').resolves([productsFromDB]);

        const products = await productModel.findAll();

        expect(products).to.be.deep.equal(productsFromDB);
    });

    it('Será validado se é possível listar um produto a partir de um id específico', async function () {
        sinon.stub(connection, 'execute').resolves([[productFomDBById]]);
        const inputId = 1;

        const product = await productModel.findById(inputId);

        expect(product).to.be.deep.equal(productFomDBById);
    });

    it('Será validado que é possível cadastrar um produto com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([productIdFromDB]);
        const product = { name: 'ProdutoX' };

        const insertId = await productModel.insert(product);

        expect(insertId).to.be.a('number');
        expect(insertId).to.equal(productIdFromModel);
    });
});
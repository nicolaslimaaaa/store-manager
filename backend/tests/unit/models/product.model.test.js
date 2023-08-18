const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { productsFromDB, productFomDBById, productIdFromDB, productIdFromModel, returnUpdateFromDB, returnDeleteFromDB } = require('../mocks/product.mock');

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

    it('Será validado que não é possível alterar um produto sem o campo "name"', async function () {
        sinon.stub(connection, 'execute').resolves(returnUpdateFromDB);
        const id = 1;
        const product = { name: 'Cubo Mágico' };

        const productUpdate = await productModel.update(id, product);

        expect(productUpdate[0].affectedRows).to.be.equal(1);
        expect(productUpdate[0].changedRows).to.be.equal(1);
    });

    it('Será validado que é possível deletar uma venda com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves(returnDeleteFromDB);
        const id = 1;

        const productDelete = await productModel.deleteById(id);

        expect(productDelete[0].affectedRows).to.be.equal(1);
    });
});
const sinon = require('sinon');
const { expect } = require('chai');
const { saleModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesFromDB, salesFromDBById } = require('../mocks/sale.mock');

describe('Realizando testes - SALE MODEL:', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Será validado que é possível listar todas as vendas', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDB]);

        const products = await saleModel.findAll();

        expect(products).to.be.deep.equal(salesFromDB);
    });

    it('Será validado que é possível listar uma venda específica com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDBById]);
        const inputId = 1;

        const product = await saleModel.findById(inputId);

        expect(product).to.be.deep.equal(salesFromDBById);
    });
});
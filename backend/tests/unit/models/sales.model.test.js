const sinon = require('sinon');
const { expect } = require('chai');
const { saleModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesFromDB, salesFromDBById, saleIdFromDB, saleIdFromModel } = require('../mocks/sale.mock');

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

    it('Será validado que é possível cadastrar uma venda com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([saleIdFromDB]);
        const sale = [
            {
              productId: 1,
              quantity: 1,
            },
          ];

        const insertId = await saleModel.insert(sale);

        expect(insertId).to.be.a('number');
        expect(insertId).to.equal(saleIdFromModel);
    });
});
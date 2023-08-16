const sinon = require('sinon');
const { expect } = require('chai');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { salesFromDB } = require('../mocks/product.mock');
const { salesFromModelById, saleNotFound, saleWithoutProductId, erroSaleWithoutProductId, erroSaleWithoutQuantity, saleWithoutQuantity, erroSaleWithQuantityLessThanOrEqualToZero, saleWithQuantityLessThanOrEqualToZero } = require('../mocks/sale.mock');
const { validatePostSale } = require('../../../src/services/validations/validationsInputsValuesSales');

describe('Realizando testes - SALE SERVICE:', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Será validado que é possível listar todas as vendas', async function () {
        sinon.stub(saleModel, 'findAll').resolves(salesFromDB);

        const products = await saleService.getAllSales();

        expect(products).to.be.deep.equal({ status: 'SUCCESSFUL', data: salesFromDB });
    });

    it('Será validado se é possível listar um produto a partir de um id específico', async function () {
        sinon.stub(saleModel, 'findById').resolves(salesFromModelById);
        const inputId = 1;

        const product = await saleService.getSaleById(inputId);

        expect(product).to.be.deep.equal({ status: 'SUCCESSFUL', data: salesFromModelById });
    });

    it('Será validado que não é possível listar um produto que não existe', async function () {
        sinon.stub(saleModel, 'findById').resolves([]);
        const inputId = 1000000000000000;

        const product = await saleService.getSaleById(inputId);

        expect(product).to.be.deep.equal(saleNotFound);
    });

    it('Será validado que não é possível cadastrar uma venda sem o campo "productId"', function async() {
        const sale = saleWithoutProductId;

        const erro = validatePostSale(sale);

        expect(erro).to.be.deep.equal(erroSaleWithoutProductId);
    });

    it('Será validado que não é possível cadastrar uma venda sem o campo "quantity"', function async() {
        const sale = saleWithoutQuantity;

        const erro = validatePostSale(sale);

        expect(erro).to.be.deep.equal(erroSaleWithoutQuantity);
    });
    
    it('Será validado que não é possível cadastrar uma venda sem o campo "quantity" menor ou igual a 0', function async() {
        const sale = saleWithQuantityLessThanOrEqualToZero;

        const erro = validatePostSale(sale);

        expect(erro).to.be.deep.equal(erroSaleWithQuantityLessThanOrEqualToZero);
    });
});
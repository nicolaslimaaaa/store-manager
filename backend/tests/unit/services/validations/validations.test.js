const sinon = require('sinon');
const { expect } = require('chai');
const {
    saleWithoutProductId,
    erroSaleWithoutProductId,
    erroSaleWithoutQuantity,
    saleWithoutQuantity,
    erroSaleWithQuantityLessThanOrEqualToZero,
    saleWithQuantityLessThanOrEqualToZero,
} = require('../../mocks/sale.mock');
const { validatePostSale } = require('../../../../src/services/validations/validationsInputsValuesSales');

describe('Realizando testes - SERVICES VALIDATIONS:', function () {
    afterEach(function () {
        sinon.restore();
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
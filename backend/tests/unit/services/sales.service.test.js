const sinon = require('sinon');
const { expect } = require('chai');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { salesFromDB } = require('../mocks/product.mock');
const {
    salesFromModelById,
    saleNotFound,
    returnDeleteSaleFromDB,
    salesFromDBById,
    // newSale,
} = require('../mocks/sale.mock');
// const schema = require('../../../src/services/validations/validationsInputsValuesSales');

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

//     it('Será validado que é possível cadastrar uma venda com sucesso', async function () {
//        sinon.stub(schema, 'validatePostSale').resolves(null);
//        sinon.stub(productModel, 'findById').resolves(Promise.resolve([[productFomDBById]]));
//        sinon.stub(saleModel, 'insert').resolves(Promise.resolve(1));

//        const retorno = await saleService.postSale(newSale);
// console.log(retorno);

//        expect(retorno.status).to.be.equal('CREATED');
//     //    expect(data).to.be.deep.equal(postSaleFromService);
//     });

    it('Será validado que é possível deletar uma venda com sucesso', async function () {
        sinon.stub(saleModel, 'findById').resolves([salesFromDBById]);
        sinon.stub(saleModel, 'deleteById').resolves(returnDeleteSaleFromDB);
        const id = 1;

        const { status, data } = await saleService.deleteSale(id);

        expect(status).to.be.equal('NO_CONTENT');
        expect(data).to.be.deep.equal({});
    });

    it('Será validado que não é possível deletar uma venda que não existe', async function () {
        sinon.stub(saleModel, 'findById').resolves([]);
        sinon.stub(saleModel, 'deleteById').resolves(returnDeleteSaleFromDB);
        const id = 1000000;

        const { status, data } = await saleService.deleteSale(id);

        expect(status).to.be.equal(saleNotFound.status);
        expect(data).to.be.deep.equal(saleNotFound.data);
    });
});
const sinon = require('sinon');
const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { productsFromDB, productFomDBById, productNotFound } = require('../mocks/product.mock');

describe('Realizando testes - PRODUCT SERVICE:', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Será validado se é possível listar todos os produtos', async function () {
        sinon.stub(productModel, 'findAll').resolves(productsFromDB);

        const products = await productService.getAllProducts();

        expect(products).to.be.deep.equal({ status: 'SUCCESSFUL', data: productsFromDB });
    });

    it('Será validado se é possível listar um produto a partir de um id específico', async function () {
        sinon.stub(productModel, 'findById').resolves(productFomDBById);
        const inputId = 1;

        const product = await productService.getProductById(inputId);

        expect(product).to.be.deep.equal({ status: 'SUCCESSFUL', data: productFomDBById });
    });

    it('Será validado que não é possível listar um produto que não existe', async function () {
        sinon.stub(productModel, 'findById').resolves();
        const inputId = 1000000000000000;

        const product = await productService.getProductById(inputId);

        expect(product).to.be.deep.equal(productNotFound);
    });
});
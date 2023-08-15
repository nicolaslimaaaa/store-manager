const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { productsFromService, productsFromDB } = require('../mocks/product.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Realizando testes - PRODUCT CONTROLLER:', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Será validado se é possível listar todos os produtos', async function () {
        sinon.stub(productService, 'getAllProducts').resolves(productsFromService);

        const req = {};

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.getAllProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsFromDB);
    });
});
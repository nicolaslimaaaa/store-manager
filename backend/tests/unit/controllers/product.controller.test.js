const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { productsFromService, productsFromDB, productFromService, productFomDBById, product, productPostFromService, returnDeleteFromService } = require('../mocks/product.mock');

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

    it('Será validado que é possível listar um produto específico com sucesso', async function () {
        sinon.stub(productService, 'getProductById').resolves(productFromService);
        
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.getProductById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productFomDBById);
    });

    it('Será validado que é possível cadastrar um produto com sucesso', async function () {
        sinon.stub(productService, 'postProduct').resolves(productPostFromService);
        
        const req = { body: product };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.postProduct(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(productFomDBById);
    });

    it('Será validado que é possível alterar um produto com sucesso', async function () {
        sinon.stub(productService, 'updateNameProduct').resolves(productFromService);
        
        const req = { params: { id: 1 }, body: product };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.updateNameProduct(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productFomDBById);
    });

    it('Será validado que é possível deletar um produto com sucesso', async function () {
        sinon.stub(productService, 'deleteProduct').resolves(returnDeleteFromService);
        
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.deleteProduct(req, res);

        expect(res.status).to.have.been.calledWith(204);
        expect(res.json).to.have.been.calledWith({});
    });
});
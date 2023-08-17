const sinon = require('sinon');
const { expect } = require('chai');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { productsFromDB, productFomDBById, productNotFound, productIdFromDB, returnUpdateFromDB } = require('../mocks/product.mock');

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

    it('Será validado que é possível cadastrar um produto com sucesso', async function () {
        sinon.stub(productModel, 'insert').resolves(productIdFromDB.insertId);
        const product = { name: 'ProdutoX' };

        const newProduct = await productService.postProduct(product);
        
        expect(newProduct.status).to.be.equal('CREATED');
        expect(newProduct.data).to.be.deep.equal({ id: productIdFromDB.insertId, ...product });
    });

    it('Será validado que não é possível alterar um produto que não existe', async function () {
        sinon.stub(productModel, 'findById').resolves();
        const id = 10000000000;
        const product = { name: 'Cubo Mágico' };

        const productUpdate = await productService.updateNameProduct(id, product);

        expect(productUpdate.status).to.be.equal('NOT_FOUND');
        expect(productUpdate.data).to.be.deep.equal(productNotFound.data);
    });

    it('Será validado que é possível alterar um produto com sucesso', async function () {
        sinon.stub(productModel, 'findById').resolves(productFomDBById);
        sinon.stub(productModel, 'update').resolves(returnUpdateFromDB);
        const id = 1;
        const product = { name: 'Cubo Mágico' };

        const productUpdate = await productService.updateNameProduct(id, product);

        expect(productUpdate.status).to.be.equal('SUCCESSFUL');
        expect(productUpdate.data).to.be.deep.equal({ id, ...product });
    });

    it('Será validado que não é possível deletar um produto que não existe', async function () {
        sinon.stub(productModel, 'findById').resolves();
        sinon.stub(productModel, 'deleteById').resolves();
        const id = 1000000000;
        
        const deleteUpdate = await productService.deleteProduct(id);

        expect(deleteUpdate.status).to.be.equal(productNotFound.status);
        expect(deleteUpdate.data).to.be.deep.equal(productNotFound.data);
    });
});
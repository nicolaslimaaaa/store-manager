const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { salesFromService, salesFromDB, salesFromDBById, salesByIdFromService, returnPostSaleFromService, newSale, dataSalePostFromService } = require('../mocks/sale.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Realizando testes - SALE CONTROLLER:', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('Será validado que é possível listar todas as vendas', async function () {
        sinon.stub(saleService, 'getAllSales').resolves(salesFromService);

        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await saleController.getAllSales(req, res);
        
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesFromDB);
    });

    it('Será validado que é possível listar uma venda específica com sucesso', async function () {
        sinon.stub(saleService, 'getSaleById').resolves(salesByIdFromService);
        
        const req = { params: { id: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await saleController.getSaleById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesFromDBById);
    });

    it('Será validado que é possível cadastrar uma venda com sucesso', async function () {
        sinon.stub(saleService, 'postSale').resolves(returnPostSaleFromService);
        
        const req = { body: newSale };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await saleController.postSale(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(dataSalePostFromService);
    });
});
const { postSaleSchema, saleUpdateSchema } = require('./schemas');

const validatePostSale = (sale) => {
    const { error } = postSaleSchema.validate(sale);
    
    if (error) {
        if (error.message === '"productId" is required') {
            return { status: 'BAD_REQUEST', message: error.message };
        }

        if (error.message === '"quantity" is required') {
            return { status: 'BAD_REQUEST', message: error.message };
        }

        return { status: 'INVALID_VALUE', message: error.message };
    }
};

const validateUpdateSale = (sale) => {
    const { error } = saleUpdateSchema.validate(sale);

    if (error) {
        if (error.message === '"quantity" is required') {
            return { status: 'BAD_REQUEST', message: error.message };
        } 

        return { status: 'INVALID_VALUE', message: error.message };
    }
};

module.exports = {
    validatePostSale,
    validateUpdateSale,
};
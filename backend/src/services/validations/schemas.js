const Joi = require('joi');

const saleSchema = Joi.object({
    productId: Joi.number().integer().required().label('productId'),
    quantity: Joi.number().integer().min(1).required()
.label('quantity'),
}).messages({
    'number.min': '{{#label}} must be greater than or equal to 1',
    'any.required': '{{#label}} is required',
});

const postSaleSchema = Joi.array().items(saleSchema);

module.exports = {
    postSaleSchema,
};
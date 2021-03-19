const Joi = require('joi');

module.exports.productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    category: Joi.string().allow(''),
    price: Joi.number().required().min(0),
});

module.exports.reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  body: Joi.string().required(),
})
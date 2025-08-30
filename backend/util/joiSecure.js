const Joi = require('joi');
const mongoIdSchema = Joi.string().hex().length(24);
const cartItemSchema = Joi.object({
  product: mongoIdSchema,
  qty: Joi.number().integer().min(0).default(0).required()
});
const productItemSchema = Joi.object({
        product : mongoIdSchema,
        qty: Joi.number().min(0).required()
})

module.exports.joiProductSecure = Joi.object({
    name :Joi.string().alphanum().required(),
    description : Joi.string().required(),
    price:  Joi.number().required(),
    unit: Joi.string().valid('kg', 'piece', 'g', 'bunch').required(),
    category: Joi.string().trim().required(),
    reviews: Joi.array().items(mongoIdSchema).optional(),
    imageUrl: Joi.string().required(),
    stock: Joi.number().required().default(0),
    discount: Joi.number().required().default(10),
    originalPrice: Joi.number().required(),
    originPlace: Joi.string().default('Punjab')
})

module.exports.joiReviewSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    author : Joi.array().items(mongoIdSchema).optional(),
})

module.exports.joiUserSchema = Joi.object({
    username : Joi.string().alphanum().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().regex(/^\d{7,15}$/).required(),
    countryCode : Joi.string().regex(/^\+?\d{1,4}/).required(),
    password: Joi.string().required(),
    reviews: Joi.array().items(mongoIdSchema).optional(),
    cart: Joi.array().items(cartItemSchema).optional(),
})
module.exports.joiContactSchema = Joi.object({
    username : Joi.string().alphanum().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().regex(/^\d{7,15}$/).required(),
    countryCode : Joi.string().regex(/^\+?\d{1,4}/).required(),
    issue: Joi.string().required().valid('Too Many Options', 'Wrong Control', 'Poor Mobile & Accessibility' , 'Unhelpful Order'),
    describe: Joi.string().required()
})

module.exports.joiOrderSchema = Joi.object({
    userId : mongoIdSchema,
    productInfo: Joi.array().items(productItemSchema).optional(),
    address : Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    mode: Joi.string().required(),
    total : Joi.number().required(),
    check : Joi.boolean().required(),
    status : Joi.string().valid('Shipped', 'Processing', 'Delivered').default('Processing'),  
})


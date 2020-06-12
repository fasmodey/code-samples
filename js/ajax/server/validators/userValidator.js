const { validate, Joi } = require('express-validation');

exports.validateUserModel = validate({
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().optional(),
    address: Joi.object().optional().options({ allowUnknown: true }),
    phone: Joi.string().optional(),
    website: Joi.string().optional(),
    company:  Joi.object().optional().options({ allowUnknown: true }),
  })
}, {}, {});

exports.validatePermitions = validate({
  headers: Joi.object({
    authorization: Joi.string().required().valid('admin')
  }).options({ allowUnknown: true })
}, {}, {});
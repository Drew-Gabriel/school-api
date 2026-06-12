const Joi = require("joi");

const instructorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  department: Joi.string().required(),
  phone: Joi.string().required(),
  office: Joi.string().required(),
  specialization: Joi.string().required()
});

module.exports = instructorSchema;
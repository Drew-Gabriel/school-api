const Joi = require("joi");

const studentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  course: Joi.string().required(),
  level: Joi.number().required(),
  phone: Joi.string().required()
});

module.exports = studentSchema;
const Joi = require("joi");

const courseSchema = Joi.object({
  courseName: Joi.string().required(),
  courseCode: Joi.string().required(),
  instructor: Joi.string().required(),
  credits: Joi.number().required(),
  semester: Joi.string().required(),
  department: Joi.string().required(),
  capacity: Joi.number().required()
});

module.exports = courseSchema;
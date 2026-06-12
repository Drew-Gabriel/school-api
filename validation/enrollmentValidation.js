const Joi = require("joi");

const enrollmentSchema = Joi.object({
  studentId: Joi.string().required(),
  courseId: Joi.string().required(),
  semester: Joi.string().required(),
  grade: Joi.string().required()
});

module.exports = enrollmentSchema;
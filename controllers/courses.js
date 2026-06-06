const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

// Validation
const courseSchema = Joi.object({
  courseName: Joi.string().required(),
  courseCode: Joi.string().required(),
  instructor: Joi.string().required(),
  credits: Joi.number().required(),
  semester: Joi.string().required(),
  department: Joi.string().required(),
  capacity: Joi.number().required()
});

// GET all courses
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const courses = await db.collection("courses").find().toArray();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET single course
const getSingle = async (req, res) => {
  try {
    const db = getDb();
    const course = await db.collection("courses").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!course) return res.status(404).json("Not found");

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// CREATE course
const createCourse = async (req, res) => {
  try {
    const { error } = courseSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const db = getDb();
    const result = await db.collection("courses").insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE course
const updateCourse = async (req, res) => {
  try {
    const { error } = courseSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const db = getDb();
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("courses").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};
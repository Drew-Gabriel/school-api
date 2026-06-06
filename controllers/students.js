const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

// Validation schema
const studentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  course: Joi.string().required(),
  level: Joi.number().required(),
  phone: Joi.string().required()
});

// GET all students
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const students = await db.collection("students").find().toArray();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET one student
const getSingle = async (req, res) => {
  try {
    const db = getDb();
    const student = await db.collection("students").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!student) return res.status(404).json("Not found");

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// CREATE student
const createStudent = async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const db = getDb();
    const result = await db.collection("students").insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE student
const updateStudent = async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const db = getDb();
    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("students").deleteOne({
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
  createStudent,
  updateStudent,
  deleteStudent
};
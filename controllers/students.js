const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");
const studentSchema = require("../validation/studentValidation");

// GET ALL STUDENTS
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("students").find().toArray();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE STUDENT
const getSingle = async (req, res) => {
  try {
    const db = getDb();

    const data = await db.collection("students").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!data) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const db = getDb();

    const result = await db.collection("students").insertOne(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      insertedId: result.insertedId.toString(),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const { error } = studentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const db = getDb();

    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("students").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent,
};
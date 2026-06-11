const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("students").find().toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDb();

    const data = await db.collection("students").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!data) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("students").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("students").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};
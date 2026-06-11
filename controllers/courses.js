const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("courses").find().toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDb();

    const data = await db.collection("courses").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("courses").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("courses").deleteOne({
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
  createCourse,
  updateCourse,
  deleteCourse
};
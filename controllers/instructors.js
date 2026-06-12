const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");
const instructorSchema = require("../validation/instructorValidation");

const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("instructors").find().toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDb();

    const data = await db.collection("instructors").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!data) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createInstructor = async (req, res) => {
  try {
    const { error } = instructorSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const db = getDb();

    const result = await db.collection("instructors").insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateInstructor = async (req, res) => {
  try {
    const { error } = instructorSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const db = getDb();

    const result = await db.collection("instructors").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteInstructor = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("instructors").deleteOne({
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
  createInstructor,
  updateInstructor,
  deleteInstructor
};
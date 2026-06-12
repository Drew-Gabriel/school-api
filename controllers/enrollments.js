const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");
const enrollmentSchema = require("../validation/enrollmentValidation");

const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("enrollments").find().toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDb();

    const data = await db.collection("enrollments").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!data) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEnrollment = async (req, res) => {
  try {
    const { error } = enrollmentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const db = getDb();

    const result = await db.collection("enrollments").insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEnrollment = async (req, res) => {
  try {
    const { error } = enrollmentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const db = getDb();

    const result = await db.collection("enrollments").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEnrollment = async (req, res) => {
  try {
    const db = getDb();

    const result = await db.collection("enrollments").deleteOne({
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
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
};
const router = require("express").Router();
const students = require("../controllers/students");

router.get("/", students.getAll);
router.get("/:id", students.getSingle);
router.post("/", students.createStudent);
router.put("/:id", students.updateStudent);
router.delete("/:id", students.deleteStudent);

module.exports = router;
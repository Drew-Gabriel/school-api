const router = require("express").Router();
const students = require("../controllers/students");
const verifyToken = require("../middleware/auth");

router.get("/", students.getAll);
router.get("/:id", students.getSingle);

router.post("/", verifyToken, students.createStudent);
router.put("/:id", verifyToken, students.updateStudent);

router.delete("/:id", students.deleteStudent);

module.exports = router;
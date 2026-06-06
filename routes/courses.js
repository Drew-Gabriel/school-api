const router = require("express").Router();
const courses = require("../controllers/courses");

router.get("/", courses.getAll);
router.get("/:id", courses.getSingle);
router.post("/", courses.createCourse);
router.put("/:id", courses.updateCourse);
router.delete("/:id", courses.deleteCourse);

module.exports = router;
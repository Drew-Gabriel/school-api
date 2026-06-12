const router = require("express").Router();
const courses = require("../controllers/courses");
const verifyToken = require("../middleware/auth");

router.get("/", courses.getAll);
router.get("/:id", courses.getSingle);

router.post("/", verifyToken, courses.createCourse);
router.put("/:id", verifyToken, courses.updateCourse);

router.delete("/:id", courses.deleteCourse);

module.exports = router;
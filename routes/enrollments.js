const router = require("express").Router();
const enrollments = require("../controllers/enrollments");

router.get("/", enrollments.getAll);
router.get("/:id", enrollments.getSingle);
router.post("/", enrollments.createEnrollment);
router.put("/:id", enrollments.updateEnrollment);
router.delete("/:id", enrollments.deleteEnrollment);

module.exports = router;
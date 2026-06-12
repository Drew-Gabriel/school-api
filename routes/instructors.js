const router = require("express").Router();
const instructors = require("../controllers/instructors");

router.get("/", instructors.getAll);
router.get("/:id", instructors.getSingle);
router.post("/", instructors.createInstructor);
router.put("/:id", instructors.updateInstructor);
router.delete("/:id", instructors.deleteInstructor);

module.exports = router;
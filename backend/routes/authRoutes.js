const express = require("express");

const {
    registerStudent,
    loginStudent,
    registerTeacher,
    loginTeacher
} = require("../controllers/authController");

const router = express.Router();

router.post("/register/student", registerStudent);
router.post("/login/student", loginStudent);

router.post("/register/teacher", registerTeacher);
router.post("/login/teacher", loginTeacher);

module.exports = router;
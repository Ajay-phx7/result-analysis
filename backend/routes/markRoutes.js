const express = require("express");

const {
    uploadMarks,
    getStudentMarks
} = require("../controllers/markController");

const {
    verifyToken,
    isTeacher
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/upload",
    verifyToken,
    isTeacher,
    uploadMarks
);

router.get(
    "/student/:studentId",
    getStudentMarks
);

module.exports = router;
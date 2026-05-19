const express = require("express");

const {
    createSubject,
    getSubjects
} = require("../controllers/subjectController");

const {
    verifyToken,
    isTeacher
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/create",
    verifyToken,
    isTeacher,
    createSubject
);

router.get("/", getSubjects);

module.exports = router;
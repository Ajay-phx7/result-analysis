const express = require("express");

const {
    getStudentDashboard
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
    "/student/:studentId",
    getStudentDashboard
);

module.exports = router;
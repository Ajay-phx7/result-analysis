const express = require("express");

const {
    verifyToken,
    isTeacher
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/teacher-only",
    verifyToken,
    isTeacher,
    (req, res) => {

        res.json({
            message: "Welcome Teacher"
        });

    }
);

module.exports = router;
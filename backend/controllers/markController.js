const prisma = require("../utils/prisma");

function calculateGrade(total) {

    if (total >= 90) return "O";
    if (total >= 80) return "A+";
    if (total >= 70) return "A";
    if (total >= 60) return "B+";
    if (total >= 50) return "B";

    return "F";
}

exports.uploadMarks = async (req, res) => {

    try {

        const {
            studentId,
            subjectId,
            internalMarks,
            externalMarks
        } = req.body;

        const total =
            internalMarks + externalMarks;

        const grade =
            calculateGrade(total);

        const mark = await prisma.mark.create({
            data: {
                studentId,
                subjectId,
                internalMarks,
                externalMarks,
                total,
                grade
            }
        });

        res.status(201).json(mark);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

exports.getStudentMarks = async (req, res) => {

    try {

        const studentId =
            parseInt(req.params.studentId);

        const marks =
            await prisma.mark.findMany({
                where: {
                    studentId
                },
                include: {
                    subject: true
                }
            });

        res.json(marks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
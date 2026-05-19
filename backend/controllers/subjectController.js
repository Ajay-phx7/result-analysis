const prisma = require("../utils/prisma");

exports.createSubject = async (req, res) => {

    try {

        const {
            subjectName,
            subjectCode,
            credits,
            semester
        } = req.body;

        const teacherId = req.user.id;

        const subject = await prisma.subject.create({
            data: {
                subjectName,
                subjectCode,
                credits,
                semester,
                teacherId
            }
        });

        res.status(201).json(subject);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

exports.getSubjects = async (req, res) => {

    try {

        const subjects = await prisma.subject.findMany({
            include: {
                teacher: true
            }
        });

        res.json(subjects);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
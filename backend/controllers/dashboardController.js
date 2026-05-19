const prisma = require("../utils/prisma");

function getGradePoint(grade) {

    switch (grade) {

        case "O":
            return 10;

        case "A+":
            return 9;

        case "A":
            return 8;

        case "B+":
            return 7;

        case "B":
            return 6;

        case "C":
            return 5;

        case "D":
            return 4;

        default:
            return 0;
    }
}

exports.getStudentDashboard = async (req, res) => {

    try {

        const studentId =
            parseInt(req.params.studentId);

        const student =
            await prisma.student.findUnique({
                where: {
                    id: studentId
                }
            });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const marks =
            await prisma.mark.findMany({
                where: {
                    studentId
                },
                include: {
                    subject: true
                },
                orderBy: {
                    subject: {
                        semester: 'asc'
                    }
                }
            });

        // Group marks by semester
        const marksBySemester = {};
        marks.forEach((mark) => {
            const sem = mark.subject.semester;
            if (!marksBySemester[sem]) {
                marksBySemester[sem] = [];
            }
            marksBySemester[sem].push(mark);
        });

        // Calculate SPGA for each semester
        const semesterData = [];
        let totalCredits = 0;
        let totalPoints = 0;

        Object.keys(marksBySemester).sort((a, b) => a - b).forEach((sem) => {
            let semCredits = 0;
            let semPoints = 0;

            marksBySemester[sem].forEach((mark) => {
                const credits = mark.subject.credits;
                const gradePoint = getGradePoint(mark.grade);

                semCredits += credits;
                semPoints += gradePoint * credits;
                totalCredits += credits;
                totalPoints += gradePoint * credits;
            });

            const spga = semCredits > 0
                ? (semPoints / semCredits).toFixed(2)
                : 0;

            semesterData.push({
                semester: parseInt(sem),
                spga: parseFloat(spga),
                marks: marksBySemester[sem],
                totalCredits: semCredits,
                totalPoints: semPoints
            });
        });

        const cgpa =
            totalCredits > 0
                ? (totalPoints / totalCredits)
                    .toFixed(2)
                : 0;

        // Find failed subjects
        const failedSubjects = marks.filter(m => m.grade === "F");
        const currentSemesterMarks = marks.filter(m => m.subject.semester === student.semester);
        
        res.json({
            student,
            marks: currentSemesterMarks,
            semesterData,
            cgpa,
            currentSemester: student.semester,
            failedSubjects,
            allMarks: marks,
            hasFailedSubjects: failedSubjects.length > 0
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
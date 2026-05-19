const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.mark.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();

  console.log("✓ Cleared existing data");

  // Create Teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        name: "Dr. Rajesh Kumar",
        email: "rajesh.kumar@school.edu",
        password: await bcrypt.hash("password123", 10),
        subject: "Mathematics",
        role: "teacher",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Prof. Priya Singh",
        email: "priya.singh@school.edu",
        password: await bcrypt.hash("password123", 10),
        subject: "Physics",
        role: "teacher",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Dr. Amit Patel",
        email: "amit.patel@school.edu",
        password: await bcrypt.hash("password123", 10),
        subject: "Chemistry",
        role: "teacher",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Ms. Neha Gupta",
        email: "neha.gupta@school.edu",
        password: await bcrypt.hash("password123", 10),
        subject: "English",
        role: "teacher",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Dr. Vikram Sharma",
        email: "vikram.sharma@school.edu",
        password: await bcrypt.hash("password123", 10),
        subject: "Computer Science",
        role: "teacher",
      },
    }),
  ]);

  console.log("✓ Created 5 teachers");

  // Create Subjects
  const subjects = await Promise.all([
    // Semester 1
    prisma.subject.create({
      data: {
        subjectName: "Calculus and Algebra",
        subjectCode: "MATH101",
        credits: 4,
        semester: 1,
        teacherId: teachers[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Linear Algebra",
        subjectCode: "MATH102",
        credits: 3,
        semester: 1,
        teacherId: teachers[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Mechanics and Waves",
        subjectCode: "PHY101",
        credits: 4,
        semester: 1,
        teacherId: teachers[1].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Organic Chemistry",
        subjectCode: "CHM101",
        credits: 4,
        semester: 1,
        teacherId: teachers[2].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "English Literature",
        subjectCode: "ENG101",
        credits: 3,
        semester: 1,
        teacherId: teachers[3].id,
      },
    }),
    // Semester 2
    prisma.subject.create({
      data: {
        subjectName: "Electricity and Magnetism",
        subjectCode: "PHY102",
        credits: 4,
        semester: 2,
        teacherId: teachers[1].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Inorganic Chemistry",
        subjectCode: "CHM102",
        credits: 3,
        semester: 2,
        teacherId: teachers[2].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Technical Writing",
        subjectCode: "ENG102",
        credits: 3,
        semester: 2,
        teacherId: teachers[3].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Programming Fundamentals",
        subjectCode: "CS101",
        credits: 4,
        semester: 1,
        teacherId: teachers[4].id,
      },
    }),
    prisma.subject.create({
      data: {
        subjectName: "Data Structures",
        subjectCode: "CS102",
        credits: 4,
        semester: 2,
        teacherId: teachers[4].id,
      },
    }),
  ]);

  console.log("✓ Created 10 subjects");

  // Helper function to generate marks with grade
  function generateMarks(internal, external) {
    const total = internal + external;
    let grade;
    if (total >= 90) grade = "A+";
    else if (total >= 80) grade = "A";
    else if (total >= 70) grade = "B";
    else if (total >= 60) grade = "C";
    else if (total >= 50) grade = "D";
    else grade = "F";
    return { internal, external, total, grade };
  }

  // Create Students - 4 per semester
  const students = await Promise.all([
    // Semester 1 - 4 students
    prisma.student.create({
      data: {
        name: "Arjun Verma",
        rollNo: "2024001",
        email: "arjun.verma@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 1,
      },
    }),
    prisma.student.create({
      data: {
        name: "Sneha Desai",
        rollNo: "2024002",
        email: "sneha.desai@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 1,
      },
    }),
    prisma.student.create({
      data: {
        name: "Rohan Joshi",
        rollNo: "2024003",
        email: "rohan.joshi@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 1,
      },
    }),
    prisma.student.create({
      data: {
        name: "Priya Sharma",
        rollNo: "2024004",
        email: "priya.sharma@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 1,
      },
    }),
    // Semester 2 - 4 students
    prisma.student.create({
      data: {
        name: "Pooja Nair",
        rollNo: "2023005",
        email: "pooja.nair@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 2,
      },
    }),
    prisma.student.create({
      data: {
        name: "Kunal Singh",
        rollNo: "2023006",
        email: "kunal.singh@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 2,
      },
    }),
    prisma.student.create({
      data: {
        name: "Ananya Mishra",
        rollNo: "2023007",
        email: "ananya.mishra@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 2,
      },
    }),
    prisma.student.create({
      data: {
        name: "Rahul Kumar",
        rollNo: "2023008",
        email: "rahul.kumar@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 2,
      },
    }),
    // Semester 3 - 4 students
    prisma.student.create({
      data: {
        name: "Varun Reddy",
        rollNo: "2022009",
        email: "varun.reddy@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 3,
      },
    }),
    prisma.student.create({
      data: {
        name: "Diya Kapoor",
        rollNo: "2022010",
        email: "diya.kapoor@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 3,
      },
    }),
    prisma.student.create({
      data: {
        name: "Nikhil Garg",
        rollNo: "2022011",
        email: "nikhil.garg@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 3,
      },
    }),
    prisma.student.create({
      data: {
        name: "Divya Sharma",
        rollNo: "2022012",
        email: "divya.sharma@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 3,
      },
    }),
    // Semester 4 - 4 students
    prisma.student.create({
      data: {
        name: "Aditya Maurya",
        rollNo: "2021013",
        email: "aditya.maurya@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 4,
      },
    }),
    prisma.student.create({
      data: {
        name: "Ritika Bhat",
        rollNo: "2021014",
        email: "ritika.bhat@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 4,
      },
    }),
    prisma.student.create({
      data: {
        name: "Sanjay Patel",
        rollNo: "2021015",
        email: "sanjay.patel@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 4,
      },
    }),
    prisma.student.create({
      data: {
        name: "Kavya Desai",
        rollNo: "2021016",
        email: "kavya.desai@student.edu",
        password: await bcrypt.hash("studentpass", 10),
        department: "Science",
        semester: 4,
      },
    }),
  ]);

  console.log("✓ Created 16 students (4 per semester)");

  const sem1Subjects = subjects.slice(0, 5); // 5 subjects for sem 1
  const sem2Subjects = subjects.slice(5, 10); // 5 subjects for sem 2

  // Create comprehensive marks data
  const marksData = [];

  // Semester 1 Students (indices 0-3): Only have sem1 subjects
  for (let i = 0; i < 4; i++) {
    for (const subject of sem1Subjects) {
      let marks;
      // Rohan (2) will have one failed subject
      if (i === 2 && subject === sem1Subjects[0]) {
        marks = generateMarks(8, 15); // total 23, fail
      } else {
        marks = generateMarks(
          Math.floor(Math.random() * 15) + 20,
          Math.floor(Math.random() * 40) + 35
        );
      }

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }
  }

  // Semester 2 Students (indices 4-7): Have both sem1 and sem2 subjects
  for (let i = 4; i < 8; i++) {
    // Previous semester subjects (sem1)
    for (const subject of sem1Subjects) {
      let marks;
      // Kunal (5) has fail in sem1, Rahul (7) has fail in sem1
      if ((i === 5 || i === 7) && subject === sem1Subjects[1]) {
        marks = generateMarks(12, 25); // total 37, fail
      } else {
        marks = generateMarks(
          Math.floor(Math.random() * 15) + 20,
          Math.floor(Math.random() * 40) + 35
        );
      }

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }

    // Current semester subjects (sem2)
    for (const subject of sem2Subjects) {
      const marks = generateMarks(
        Math.floor(Math.random() * 15) + 20,
        Math.floor(Math.random() * 40) + 35
      );

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }
  }

  // Semester 3 Students (indices 8-11): Have both sem1 and sem2 subjects
  for (let i = 8; i < 12; i++) {
    // Semester 1 subjects
    for (const subject of sem1Subjects) {
      const marks = generateMarks(
        Math.floor(Math.random() * 15) + 20,
        Math.floor(Math.random() * 40) + 35
      );

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }

    // Semester 2 subjects
    for (const subject of sem2Subjects) {
      let marks;
      // Diya (9) has one fail in sem2
      if (i === 9 && subject === sem2Subjects[0]) {
        marks = generateMarks(10, 20); // total 30, fail
      } else {
        marks = generateMarks(
          Math.floor(Math.random() * 15) + 20,
          Math.floor(Math.random() * 40) + 35
        );
      }

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }
  }

  // Semester 4 Students (indices 12-15): Have both sem1 and sem2 subjects
  for (let i = 12; i < 16; i++) {
    // Semester 1 subjects
    for (const subject of sem1Subjects) {
      const marks = generateMarks(
        Math.floor(Math.random() * 15) + 20,
        Math.floor(Math.random() * 40) + 35
      );

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }

    // Semester 2 subjects
    for (const subject of sem2Subjects) {
      const marks = generateMarks(
        Math.floor(Math.random() * 15) + 20,
        Math.floor(Math.random() * 40) + 35
      );

      marksData.push({
        studentId: students[i].id,
        subjectId: subject.id,
        internalMarks: marks.internal,
        externalMarks: marks.external,
        total: marks.total,
        grade: marks.grade,
      });
    }
  }

  // Create all marks
  await prisma.mark.createMany({
    data: marksData,
  });

  console.log(`✓ Created ${marksData.length} mark records`);

  console.log("\n✅ Database seeding completed successfully!\n");
  console.log("📊 Summary:");
  console.log(`   - Teachers: ${teachers.length}`);
  console.log(`   - Subjects: ${subjects.length}`);
  console.log(`   - Students: ${students.length} (4 per semester)`);
  console.log(`   - Mark Records: ${marksData.length}`);
  console.log("\n❌ Students with Failed Subjects:");
  console.log("   - Rohan Joshi (Sem 1): Failed Calculus and Algebra");
  console.log("   - Kunal Singh (Sem 2): Failed Linear Algebra (from Sem 1)");
  console.log("   - Rahul Kumar (Sem 2): Failed Linear Algebra (from Sem 1)");
  console.log("   - Diya Kapoor (Sem 3): Failed Electricity and Magnetism (from Sem 2)");
  console.log("\n🔐 Sample Login Credentials:");
  console.log("   Sem 1 (Pass): arjun.verma@student.edu / studentpass");
  console.log("   Sem 1 (Fail): rohan.joshi@student.edu / studentpass");
  console.log("   Sem 2 (Pass): pooja.nair@student.edu / studentpass");
  console.log("   Sem 2 (Fail): kunal.singh@student.edu / studentpass");
  console.log("   Sem 3 (Pass): varun.reddy@student.edu / studentpass");
  console.log("   Sem 3 (Fail): diya.kapoor@student.edu / studentpass");
  console.log("   Sem 4 (Pass): aditya.maurya@student.edu / studentpass");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

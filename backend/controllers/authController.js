const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {

  try {

    const {
      name,
      rollNo,
      email,
      password,
      department,
      semester
    } = req.body;

    const existingStudent =
      await prisma.student.findUnique({
        where: {
          email
        }
      });

    if (existingStudent) {

      return res.status(400).json({
        message: "Student already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const student =
      await prisma.student.create({
        data: {
          name,
          rollNo,
          email,
          password: hashedPassword,
          department,
          semester
        }
      });

    res.status(201).json({
      message:
        "Student registered successfully",
      student
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.loginStudent = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const student =
      await prisma.student.findUnique({
        where: {
          email
        }
      });

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        student.password
      );

    if (!validPassword) {

      return res.status(401).json({
        message: "Invalid password"
      });

    }

    const token = jwt.sign(
      {
        id: student.id,
        role: "student"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      student: {
        ...student,
        role: "student"
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.registerTeacher = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      subject
    } = req.body;

    const existingTeacher =
      await prisma.teacher.findUnique({
        where: {
          email
        }
      });

    if (existingTeacher) {

      return res.status(400).json({
        message: "Teacher already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const teacher =
      await prisma.teacher.create({
        data: {
          name,
          email,
          password: hashedPassword,
          subject
        }
      });

    res.status(201).json({
      message:
        "Teacher registered successfully",
      teacher
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.loginTeacher = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const teacher =
      await prisma.teacher.findUnique({
        where: {
          email
        }
      });

    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        teacher.password
      );

    if (!validPassword) {

      return res.status(401).json({
        message: "Invalid password"
      });

    }

    const token = jwt.sign(
      {
        id: teacher.id,
        role: "teacher"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      teacher: {
        ...teacher,
        role: "teacher"
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};
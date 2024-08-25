const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Sign up a new student
exports.signupStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    address,
    academicDetails,
    documents,
    password,
  } = req.body;

  try {
    const student = await Student.signup(
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      address,
      academicDetails,
      documents,
      password
    );

    // Create a JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ student, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login a student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      throw new Error("Invalid email or password!");
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      throw new Error("Invalid email or password!");
    }

    // Create a JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ student, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

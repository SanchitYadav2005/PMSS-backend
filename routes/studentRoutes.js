const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

// Student signup
router.post("/signup", studentController.signupStudent);

// Student login
router.post("/login", studentController.loginStudent);

// Get all students
router.get("/", studentController.getAllStudents);

// Get a student by ID
router.get("/:id", studentController.getStudentById);

// Update a student by ID
router.put("/:id", studentController.updateStudent);

// Delete a student by ID
router.delete("/:id", studentController.deleteStudent);

module.exports = router;

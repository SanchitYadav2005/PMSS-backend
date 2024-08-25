const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 17, // Assuming scholarship is for students 17 and older
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  academicDetails: {
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
    },
    GPA: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
    },
    extracurriculars: [String], // Array of extracurricular activities
  },
  documents: {
    essay: {
      type: String, // Path to the essay file
      required: true,
    },
    transcript: {
      type: String, // Path to the transcript file
      required: true,
    },
    recommendationLetter: {
      type: String, // Path to the recommendation letter file
    },
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

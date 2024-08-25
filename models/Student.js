const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  academicDetails: {
    schoolName: {
      type: String,
      required: true,
      trim: true
    },
    grade: {
      type: String,
      required: true
    },
    GPA: {
      type: Number,
      required: true,
      min: 0,
      max: 4
    },
    extracurriculars: [String] // Array of extracurricular activities
  },
  documents: {
    essay: {
      type: String, // Path to the essay file
      // required: true
    },
    transcript: {
      type: String, // Path to the transcript file
      // required: true
    },
    recommendationLetter: {
      type: String // Path to the recommendation letter file
    }
  },
  password: {
    type: String,
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  }
});

// Static method for student signup
studentSchema.statics.signup = async function (firstName, lastName, age, gender, email, phone, address, academicDetails, documents, password) {
  const Student = this;

  // Check if student exists with the provided email
  const exists = await Student.findOne({ email });
  if (exists) {
    throw new Error("Student already exists!");
  }

  if (!firstName || !lastName || !age || !gender || !email || !phone || !academicDetails || !documents || !password) {
    throw new Error("All fields must be filled!");
  }

  // Validate the email
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email!");
  }

  // Validate password strength
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
  ) {
    throw new Error("Password is not strong enough!");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create and save the new student
  const student = await Student.create({
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    address,
    academicDetails,
    documents,
    password: hash
  });

  return student;
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authoritySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Reviewer", "Admin"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  actions: [
    {
      applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        required: true,
      },
      comments: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Static method for authority signup
authoritySchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  phone,
  role,
  password
) {
  const Authority = this;

  // Check if authority exists with the provided email
  const exists = await Authority.findOne({ email });
  if (exists) {
    throw new Error("Authority already exists!");
  }

  if (!firstName || !lastName || !email || !phone || !role || !password) {
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
      minSymbols: 1,
    })
  ) {
    throw new Error("Password is not strong enough!");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create and save the new authority
  const authority = await Authority.create({
    firstName,
    lastName,
    email,
    phone,
    role,
    password: hash,
  });

  return authority;
};

const Authority = mongoose.model("Authority", authoritySchema);
module.exports = Authority;

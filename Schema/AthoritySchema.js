const mongoose = require('mongoose');

const authoritySchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Reviewer', 'Admin'],
    required: true
  },
  assignedApplications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  actions: [{
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      required: true
    },
    comments: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

const Authority = mongoose.model('Authority', authoritySchema);

module.exports = Authority;

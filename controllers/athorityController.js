const Authority = require("../models/Authority");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Sign up a new authority
exports.signupAuthority = async (req, res) => {
  const { firstName, lastName, email, phone, role, password } = req.body;

  try {
    const authority = await Authority.signup(
      firstName,
      lastName,
      email,
      phone,
      role,
      password
    );

    // Create a JWT token
    const token = jwt.sign({ id: authority._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ authority, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login an authority
exports.loginAuthority = async (req, res) => {
  const { email, password } = req.body;

  try {
    const authority = await Authority.findOne({ email });
    if (!authority) {
      throw new Error("Invalid email or password!");
    }

    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) {
      throw new Error("Invalid email or password!");
    }

    // Create a JWT token
    const token = jwt.sign({ id: authority._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ authority, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all authorities
exports.getAllAuthorities = async (req, res) => {
  try {
    const authorities = await Authority.find();
    res.status(200).json(authorities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific authority by ID
exports.getAuthorityById = async (req, res) => {
  try {
    const authority = await Authority.findById(req.params.id);
    if (!authority) {
      return res.status(404).json({ message: "Authority not found" });
    }
    res.status(200).json(authority);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update authority details by ID
exports.updateAuthority = async (req, res) => {
  try {
    const updatedAuthority = await Authority.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAuthority) {
      return res.status(404).json({ message: "Authority not found" });
    }
    res.status(200).json(updatedAuthority);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete authority by ID
exports.deleteAuthority = async (req, res) => {
  try {
    const deletedAuthority = await Authority.findByIdAndDelete(req.params.id);
    if (!deletedAuthority) {
      return res.status(404).json({ message: "Authority not found" });
    }
    res.status(200).json({ message: "Authority deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign applications to an authority
exports.assignApplications = async (req, res) => {
  const { applicationIds } = req.body;

  try {
    const authority = await Authority.findById(req.params.id);
    if (!authority) {
      return res.status(404).json({ message: "Authority not found" });
    }

    authority.assignedApplications.push(...applicationIds);
    const updatedAuthority = await authority.save();
    res.status(200).json(updatedAuthority);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update application status by authority
exports.updateApplicationStatus = async (req, res) => {
  const { applicationId, status, comments } = req.body;

  try {
    const authority = await Authority.findById(req.params.id);
    if (!authority) {
      return res.status(404).json({ message: "Authority not found" });
    }

    const action = {
      applicationId,
      status,
      comments,
    };

    authority.actions.push(action);
    const updatedAuthority = await authority.save();
    res.status(200).json(updatedAuthority);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

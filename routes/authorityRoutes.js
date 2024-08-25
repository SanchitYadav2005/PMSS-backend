const express = require("express");
const authorityController = require("../controllers/authorityController");
const router = express.Router();

// Authority signup
router.post("/signup", authorityController.signupAuthority);

// Authority login
router.post("/login", authorityController.loginAuthority);

// Get all authorities
router.get("/", authorityController.getAllAuthorities);

// Get an authority by ID
router.get("/:id", authorityController.getAuthorityById);

// Update an authority by ID
router.put("/:id", authorityController.updateAuthority);

// Delete an authority by ID
router.delete("/:id", authorityController.deleteAuthority);

// Assign applications to an authority
router.post("/:id/assign-applications", authorityController.assignApplications);

// Update application status
router.post(
  "/:id/update-application-status",
  authorityController.updateApplicationStatus
);

module.exports = router;

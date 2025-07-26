// server/routes/supplierRoutes.js

const express = require('express');
const router = express.Router();
// **FIX:** Import the correct Cloudinary upload middleware
const upload = require('../config/cloudinary'); 
const auth = require('../middleware/authMiddleware');
const { uploadVerificationDocs } = require('../controllers/supplierController');

// Upload verification document route
router.post(
  '/verify',
  auth,
  // This now correctly uses the Cloudinary storage engine
  upload.fields([{ name: 'gstin', maxCount: 1 }, { name: 'fssai', maxCount: 1 }]),
  uploadVerificationDocs
);

module.exports = router;
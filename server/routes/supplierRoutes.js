const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');
const { uploadVerificationDocs } = require('../controllers/supplierController');

//Upload verification document
router.post(
  '/verify',
  auth,
  upload.fields([{ name: 'gstin', maxCount: 1 }, { name: 'fssai', maxCount: 1 }]),
  uploadVerificationDocs // This is correct
);

module.exports = router;
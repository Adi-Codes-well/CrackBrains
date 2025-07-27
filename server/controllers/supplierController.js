// server/controllers/supplierController.js
const User = require("../models/User");

exports.uploadVerificationDocs = async (req, res) => {
    const userId = req.user.id; 

    if(req.user.role !== 'supplier') {
        return res.status(403).json({ message: "Access denied. Only suppliers can upload verification documents." });
    }

  const gstinFile = req.files['gstin']?.[0];
  const fssaiFile = req.files['fssai']?.[0];

  if (!gstinFile) {
    return res.status(400).json({ message: "GSTIN document is required." });
  }

  try {
    const user = await User.findById(userId);
    user.verificationDocs = {
      gstin: gstinFile.path,
      fssai: fssaiFile ? fssaiFile.path : null,
    };
    // CHANGE: Set verificationStatus to 'pending' instead of auto-verifying
    user.verificationStatus = 'pending';
    // Keep isVerifiedSupplier as false until manually approved
    user.isVerifiedSupplier = false; // Ensure it's explicitly false until approved
    
    await user.save();

    res.json({ message: 'Documents uploaded for verification. Status: Pending Review', docs: user.verificationDocs, verificationStatus: user.verificationStatus });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading documents', error: err.message });
  }
};
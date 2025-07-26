const User = require("../models/User");

exports.uploadVerificationDocs = async (req, res) => {
    const userId = req.user.userId;

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
    // For now, simulate auto verification
    user.isVerifiedSupplier = true;
    await user.save();

    res.json({ message: 'Documents uploaded and supplier verified', docs: user.verificationDocs });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading documents', error: err.message });
  }
};
const calculateTrustScore = require('../utils/calculateTrustScore');
const User = require('../models/User');

exports.getTrustScore = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const supplier = await User.findById(supplierId);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    const trustScore = await calculateTrustScore(supplierId, supplier.isVerifiedSupplier);
    res.json({ trustScore });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating trust score', error: err.message });
  }
};

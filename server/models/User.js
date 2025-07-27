const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["vendor", "supplier"], required: true },
  isVerifiedSupplier: { type: Boolean, default: false }, // for suppliers, kept for backward compatibility where it might be checked
  verificationDocs: {
    gstin: { type: String }, // file path or URL
    fssai: { type: String },// optional
  },
  // NEW FIELD: Add verificationStatus to track the state
  verificationStatus: {
    type: String,
    enum: ['unsubmitted', 'pending', 'approved', 'rejected'],
    default: 'unsubmitted'
  }
},  { timestamps: true });



module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["vendor", "supplier"], required: true },
  isVerifiedSupplier: { type: Boolean, default: false }, // for suppliers
  verificationDocs: {
    gstin: { type: String }, // file path or URL
    fssai: { type: String },// optional
   } 
},  { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

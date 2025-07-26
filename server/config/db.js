const mongoose = require('mongoose');
require('dotenv').config(); // Ensures this module has access to .env variables

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully. 🚀');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
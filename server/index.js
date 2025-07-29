// MUST BE THE VERY FIRST LINE
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/db');
// Import Routes
const authRoutes = require('./routes/authRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const trustRoutes = require('./routes/trustRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// --- Connect to Database ---
// This is the only line needed for the database connection.
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

app.use(express.static(path.join(__dirname, '../client/dist')));

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/trust', trustRoutes);
app.use('/api/payment', paymentRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
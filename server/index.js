const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const trustRoutes = require('./routes/trustRoutes');

const paymentRoutes = require('./routes/paymentRoutes');


const app = express();
app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

app.use('/api/auth', authRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/trust', trustRoutes);

app.use('/api/payment', paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
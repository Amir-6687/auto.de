const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log("ENV:", process.env.CLOUDINARY_CLOUD_NAME);


const app = express();

app.use(cors());
app.use(express.json());

// DB
const connectDB = require('./config/db');
connectDB();

// Routes
const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

const filtersRoute = require('./routes/filters');
app.use('/api/filters', filtersRoute);

const requireInternal = require('./middleware/requireInternal');
const internalRoutes = require('./routes/internalRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/internal', requireInternal, internalRoutes);
app.use('/api/admin', requireInternal, adminRoutes);


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Auto-DE backend is running' });
});

// Start server  ← باید آخر باشد
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

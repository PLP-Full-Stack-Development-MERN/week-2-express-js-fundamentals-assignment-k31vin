const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');

// Load env variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(logger); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
res.json({ message: 'Welcome to Express Assignment API!' });
});

// 404 handler
app.use((req, res, next) => {
res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({
error: 'Internal Server Error',
message: err.message
});
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

module.exports = app;
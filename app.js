// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const Product = require('./models/Product'); // ← LÍNEA AGREGADA
const cors = require('cors');
const path = require('path');

const app = express();

// Conectar a MongoDB
connectDB();

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Ruta de health check (NUEVO - útil para Railway)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Ruta catch-all para SPA 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

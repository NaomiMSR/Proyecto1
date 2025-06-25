// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
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

// Servir archivos estáticos del frontend (NUEVO)
app.use(express.static(path.join(__dirname, 'dist')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Ruta catch-all para SPA (NUEVO)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
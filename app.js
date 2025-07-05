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

// ← ENDPOINT TEMPORAL DE SEEDING (ELIMINAR DESPUÉS DE USAR)
app.get('/seed-products', async (req, res) => {
  try {
    const productos = [
      {
        name: "Tennis Adidas",
        description: "Tennis Adidas Blancos, de diseño clásico",
        price: 1500,
        category: "Zapatos",
        image: "/images/adidas.webp",
        stock: 10
      },
      {
        name: 'Camisetas',
        description: 'Camisetas básicas de hombre',
        price: 100,
        category: 'Camisas Hombres',
        image: '/images/camiseta.jpg',
        stock: 22
      },
      {
        name: 'Collar Cadena-Perlas',
        description: 'Collar de acero inoxidable chapado de oro, con forma de cadena y perlas',
        price: 450,
        category: 'Accesorios',
        image: '/images/collar.png',
        stock: 50
      },
      {
        name: 'Conjunto infantil femenino',
        description: 'Conjunto infantil femenino, blusa blanca y falda azul',
        price: 350,
        category: 'Infantil',
        image: '/images/conjunto.jpg',
        stock: 10
      },
      {
        name: 'Jeans',
        description: 'Mom jeans clásicos',
        price: 499,
        category: 'Jeans',
        image: '/images/jeans.jpg',
        stock: 25
      },
      {
        name: 'Playera',
        description: 'Playera infantil azul con estampado de Superman',
        price: 99,
        category: 'Infantil',
        image: '/images/playera.jpg',
        stock: 44
      },
      {
        name: 'Shorts',
        description: 'Shorts de mezclilla holgados para mujer',
        price: 129,
        category: 'Shorts',
        image: '/images/shorts.webp',
        stock: 30
      },
      {
        name: 'Vestido',
        description: 'Vestido de verano para dama',
        price: 299,
        category: 'Infantil',
        image: '/images/vestido.jpg',
        stock: 15
      }
    ];

    // Eliminar productos existentes
    await Product.deleteMany({});
    console.log('Productos eliminados');

    // Insertar nuevos productos
    const productosCreados = await Product.insertMany(productos);
    console.log(`${productosCreados.length} productos creados`);

    res.json({ 
      success: true,
      message: 'Productos creados exitosamente', 
      count: productosCreados.length,
      productos: productosCreados.map(p => ({ name: p.name, category: p.category }))
    });
  } catch (error) {
    console.error('Error durante el seeding:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

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

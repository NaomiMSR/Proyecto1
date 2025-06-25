// seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Product = require('./models/Product');

// Productos de muestra
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

// Función para sembrar productos
const seedProducts = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Eliminar productos existentes (opcional)
    await Product.deleteMany({});
    console.log('Productos eliminados');
    
    // Insertar nuevos productos
    const productosCreados = await Product.insertMany(productos);
    console.log(`${productosCreados.length} productos creados`);
    
    console.log('Proceso de seeding completado');
    process.exit(0);
  } catch (error) {
    console.error('Error durante el seeding:', error);
    process.exit(1);
  }
};

// Ejecutar la función
seedProducts();
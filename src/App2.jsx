import React from 'react';
import './catalogo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

function Catalogo() {
  const productos = [
    {
      id: 1,
      nombre: 'Camiseta Algodón',
      descripcion: 'Camiseta de algodón suave y cómoda.',
      precio: 20.00,
      imagenURL: '/images/camiseta.jpg',
    },
    {
      id: 2,
      nombre: 'Pantalones Vaqueros',
      descripcion: 'Pantalones vaqueros clásicos.',
      precio: 50.00,
      imagenURL: '/images/pantalones.jpg',
    },
    {
        id: 3,
        nombre: 'Vestido de verano',
        descripcion: 'Vestido colección de verano.',
        precio: 150.00,
        imagenURL: '/images/vestido.jpg'
      },
    {
        id: 4,
        nombre: 'Collar perlas',
        descripcion: 'Collar de cadena minimalista con perlas.',
        precio: 300.00,
        imagenURL: '/images/collar.png'
    },
    {
        id: 5,
        nombre: 'Playera infantil',
        descripcion: 'Playera infantil con estampado de Superman.',
        precio: 100.00,
        imagenURL: '/images/playera.jpg'
    },
    {
        id: 6,
        nombre: 'Tennis',
        descripcion: 'Tennis Adidas blanco y negro.',
        precio: 550,
        imagenURL: '/images/adidas.webp'
    },
    {
        id: 7,
        nombre: 'Conjunto',
        descripcion: 'Conjunto femenino infantil, blusa y flada.',
        precio: 480,
        imagenURL: '/images/conjunto.jpg'
    },
    {
        id: 8,
        nombre: 'Shorts',
        descripcion: 'Shorts clásicos de mujer.',
        precio: 200,
        imagenURL: '/images/shorts.webp'
    },
  ];

  return (
    <div>
      <header>
        <h1>Catálogo de Productos</h1>
        <div className="carrito">
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
      </header>
      <div id="catalogo">
        {productos.map(producto => (
          <div key={producto.id} className="tarjeta">
            <img src={producto.imagenURL} alt={producto.nombre} />
            <div className="contenido">
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p className="precio">Precio: ${producto.precio.toFixed(2)}</p>
              <div className="botones">
                <button className="corazon">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Catalogo;
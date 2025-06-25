import React, { useState, useEffect } from 'react';
import './catalogo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config/api.js'; // ← NUEVO: Importar la configuración

function Catalogo({ user }) {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar productos desde la API
    setLoading(true);
    // ← CAMBIO: Usar API_BASE_URL en lugar de localhost
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error de servidor: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Asegurarse de que data sea un array
        if (Array.isArray(data)) {
          // Asignar un ID único en caso de que no exista _id
          const productosConId = data.map(producto => ({
            ...producto,
            id: producto._id || producto.id || `prod-${Math.random().toString(36).substr(2, 9)}`
          }));
          setProductos(productosConId);
        } else {
          console.error('Los datos recibidos no son un array:', data);
          setProductos([]);
          setError('Los datos recibidos no tienen el formato esperado');
        }
      })
      .catch(error => {
        console.error('Error cargando productos:', error);
        setError('No se pudieron cargar los productos. Por favor, intenta más tarde.');
        setProductos([]);
      })
      .finally(() => {
        setLoading(false);
      });

    // Cargar carrito del localStorage
    const savedCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(savedCarrito);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar al carrito');
      return;
    }

    // Asegurarse de que el producto tenga un ID
    const productoConId = {
      ...producto,
      id: producto._id || producto.id || `prod-${Math.random().toString(36).substr(2, 9)}`
    };

    console.log('Agregando al carrito:', productoConId);

    setCarrito(prevCarrito => {
      // Usar el ID correcto para buscar el producto en el carrito
      const productoEnCarrito = prevCarrito.find(
        p => (p.id === productoConId.id) || (p._id === productoConId._id) || (p._id === productoConId.id) || (p.id === productoConId._id)
      );
      
      if (productoEnCarrito) {
        // Si el producto ya existe, incrementar cantidad
        return prevCarrito.map(p => 
          ((p.id === productoConId.id) || (p._id === productoConId._id) || (p._id === productoConId.id) || (p.id === productoConId._id))
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        // Si el producto no existe, añadirlo al carrito
        return [...prevCarrito, { ...productoConId, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(prevCarrito => prevCarrito.filter(p => 
      p.id !== productoId && p._id !== productoId
    ));
  };

  const CarritoModal = () => (
    <div className="carrito-modal">
      <div className="carrito-contenido">
        <h2>Carrito de Compras</h2>
        <button className="btn-cerrar" onClick={() => setMostrarCarrito(false)}>×</button>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            {carrito.map(producto => (
              <div key={producto.id || producto._id} className="carrito-item">
                <img src={producto.image} alt={producto.name} />
                <div className="carrito-item-info">
                  <h3>{producto.name}</h3>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p>Precio: ${(producto.price * producto.cantidad).toFixed(2)}</p>
                </div>
                <button onClick={() => eliminarDelCarrito(producto.id || producto._id)}>×</button>
              </div>
            ))}
            <div className="carrito-total">
              <h3>Total: ${carrito.reduce((total, p) => total + p.price * p.cantidad, 0).toFixed(2)}</h3>
              <button className="btn-pagar">Proceder al pago</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <header>
        <h1>Catálogo de Productos</h1>
        <div className="header-icons">
          {!user ? (
            <button className="btn-login" onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
            </button>
          ) : (
            <div className="carrito" onClick={() => setMostrarCarrito(true)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {carrito.length > 0 && <span className="carrito-contador">{carrito.length}</span>}
            </div>
          )}
        </div>
      </header>

      <div id="catalogo">
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <div className="error-mensaje">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Intentar nuevamente</button>
          </div>
        ) : productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          productos.map(producto => (
            <div key={producto.id || producto._id} className="tarjeta">
              <img src={producto.image} alt={producto.name} />
              <div className="contenido">
                <h2>{producto.name}</h2>
                <p>{producto.description}</p>
                <p className="precio">Precio: ${producto.price.toFixed(2)}</p>
                <div className="botones">
                  <button className="btn-agregar" onClick={() => agregarAlCarrito(producto)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {mostrarCarrito && <CarritoModal />}
    </div>
  );
}

export default Catalogo;
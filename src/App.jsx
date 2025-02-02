import React, { useState, useEffect } from 'react'; // Import React!
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Catalogo from './App2.jsx';

function App() {
  const images = [
    '/images/tamaño.JPG',
    '/images/mucho.JPG',
    '/images/estilos.JPG',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="App">
      <Routes> {/* Envuelve tu contenido con Routes */}
        <Route path="/" element={ // Define la ruta por defecto ("/")
          <React.Fragment> {/* Usa React.Fragment o <> </> para agrupar elementos */}
            <header>
              <div className="logo">ModaTrend</div>
              <nav>
                <ul>
                  <Link to="/catalogo" className="btn">Catálogo</Link>
                </ul>
              </nav>
            </header>

            <section className="hero">
              <div className="carousel">
                <img
                  src={images[currentImageIndex]}
                  alt={`Moda ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
              </div>
            </section>

            <h2 className="h2">Nuestras Colecciones</h2>

            <section className="cards">
              <div className="card">
                <img src="/images/vestidos.jpg" alt="Vestidos" />
                <h3>Vestidos</h3>
                <p>Descubre nuestra colección de vestidos para todas las ocasiones.</p>
              </div>
              <div className="card">
                <img src="/images/jeans.jpg" alt="Jeans" />
                <h3>Jeans</h3>
                <p>Jeans de alta calidad y diseño moderno para un look casual.</p>
              </div>
              <div className="card">
                <img src="/images/tennis.jpg" alt="Zapatos" />
                <h3>Zapatos</h3>
                <p>Elige entre una variedad de estilos para complementar tu outfit.</p>
              </div>
              <div className="card">
                <img src="/images/accesorios.jpg" alt="Accesorios" />
                <h3>Accesorios</h3>
                <p>Completa tu look con nuestros accesorios de moda.</p>
              </div>
            </section>

            <section className="slogan">
              <p>¡Crea tu estilo!</p>
            </section>

            <footer>
              <p>&copy; 2025 ModaTrend. Todos los derechos reservados.</p>
            </footer>
          </React.Fragment>
        } />
        <Route path="/catalogo" element={<Catalogo />} /> {/* Define la ruta para /catalogo */}
      </Routes>
    </div>
  );
}

export default App;
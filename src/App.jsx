import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Catalogo from './App2.jsx';
import API_BASE_URL from './config/api.js'; // ← NUEVO: Importar la configuración
import './App.css';

// Componente de Login y Registro
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ← CAMBIO: Usar API_BASE_URL en lugar de localhost
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin(data.user);
        onClose();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (registerData.password !== registerData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // ← CAMBIO: Usar API_BASE_URL en lugar de localhost
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setError('');
        // Cambiar a la pantalla de inicio de sesión después del registro exitoso
        setIsRegistering(false);
        // Opcional: mostrar mensaje de éxito
        alert('Registro exitoso. Por favor inicia sesión.');
      } else {
        setError(data.error || 'Error en el registro');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  const toggleMode = () => {
    setError(''); // Limpiar errores al cambiar de modo
    setIsRegistering(!isRegistering);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>
        {error && <p className="error">{error}</p>}
        
        {isRegistering ? (
          // Formulario de registro
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre"
              value={registerData.name}
              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
              required
            />
            <button type="submit">Registrarse</button>
          </form>
        ) : (
          // Formulario de inicio de sesión
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
        )}
        
        {/* Botón para alternar entre inicio de sesión y registro */}
        <p className="toggle-form">
          {isRegistering 
            ? '¿Ya tienes cuenta? ' 
            : '¿No tienes cuenta? '}
          <button 
            type="button" 
            className="text-button" 
            onClick={toggleMode}
          >
            {isRegistering ? 'Iniciar Sesión' : '¡Regístrate!'}
          </button>
        </p>
        
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false); // Estado para el mensaje de éxito
  const navigate = useNavigate();

  const images = [
    '/images/tamaño.JPG',
    '/images/mucho.JPG',
    '/images/estilos.JPG',
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // ← CAMBIO: Usar API_BASE_URL en lugar de localhost
      fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => localStorage.removeItem('token'));
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Efecto para ocultar el mensaje de éxito después de un tiempo
  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        setLoginSuccess(false);
      }, 3000); // Ocultar después de 3 segundos
      
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // Función para manejar el inicio de sesión exitoso
  const handleSuccessfulLogin = (userData) => {
    setUser(userData);
    setLoginSuccess(true);
  };

  return (
    <div className="App">
      {/* Mensaje de éxito */}
      {loginSuccess && (
        <div className="success-notification">
          ¡Inicio de sesión exitoso! Bienvenido, {user?.name || 'Usuario'}
        </div>
      )}
      
      <Routes>
        <Route path="/" element={
          <React.Fragment>
            <header>
              <div className="logo">ModaTrend</div>
              <nav>
                <ul>
                  <Link to="/catalogo" className="btn">Catálogo</Link>
                  {user ? (
                    <button onClick={handleLogout} className="btn">Cerrar Sesión</button>
                  ) : (
                    <button onClick={() => setIsLoginOpen(true)} className="btn">Iniciar Sesión</button>
                  )}
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

            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              onLogin={handleSuccessfulLogin} // Usar la nueva función
            />
          </React.Fragment>
        } />
        <Route path="/catalogo" element={<Catalogo user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
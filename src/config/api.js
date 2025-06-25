// src/config/api.js
const API_BASE_URL = import.meta.env.PROD 
  ? '' // En producción, usa el mismo dominio (Railway)
  : 'http://localhost:3000'; // En desarrollo, usa localhost

export default API_BASE_URL;
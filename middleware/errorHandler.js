// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: err.message
      });
    }
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }
  
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Duplicate key error'
      });
    }
  
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  };

// Agrega esta línea al final
module.exports = errorHandler;
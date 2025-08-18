// middleware/errorHandlers.js
const unknownEndpoint = (_req, res) => {
    res.status(404).json({ error: 'unknown endpoint' });
  };
  
  // Central error handler
  const errorHandler = (err, _req, res, _next) => {
    console.error('Error:', err.name, err.message);
  
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'malformatted id' });
    }
  
    // (Validators come later in the course)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    // default
    return res.status(500).json({ error: 'internal server error' });
  };
  
  module.exports = { unknownEndpoint, errorHandler };
  
function unknownEndpoint(_req, res) {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
  function errorHandler(err, _req, res, _next) {
    if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    // Generic fallback
    return res.status(500).json({ error: 'internal server error' })
  }
  
  module.exports = { unknownEndpoint, errorHandler }
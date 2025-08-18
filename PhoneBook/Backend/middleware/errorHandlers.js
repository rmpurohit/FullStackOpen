// middleware/errorHandlers.js

const unknownEndpoint = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (err, _req, res, _next) => {
  // Central place to map technical errors to clean client-facing messages
  console.error(err.name, err.message);

  // malformed ObjectId (e.g. /api/persons/abc)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }

  // Mongoose schema validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Duplicate key (if you enable unique index for name)
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  // Invalid JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'invalid JSON in request body' });
  }

  return res.status(500).json({ error: 'internal server error' });
};

module.exports = { unknownEndpoint, errorHandler };
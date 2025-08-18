const isProd = process.env.NODE_ENV === 'production';

const unknownEndpoint = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint', code: 'UNKNOWN_ENDPOINT' });
};

const errorHandler = (err, _req, res, _next) => {
  // Only log in dev/test
  if (!isProd) {
    console.error(err.name, err.message);
  }

  // malformed ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id', code: 'BAD_ID' });
  }

  // Mongoose schema validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message, code: 'VALIDATION_ERROR' });
  }

  // Duplicate key
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ error: 'name must be unique', code: 'DUPLICATE_KEY' });
  }

  // Invalid JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'invalid JSON in request body', code: 'INVALID_JSON' });
  }

  // Fallback
  const payload = { error: 'internal server error', code: 'INTERNAL_ERROR' };
  if (!isProd) payload.details = err.message; // include message only in non-prod
  return res.status(500).json(payload);
};

module.exports = { unknownEndpoint, errorHandler };

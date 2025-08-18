const express = require('express')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

// Middlewares
app.use(express.json())

// Simple request logger (optional verbose)
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/blogs', blogsRouter)

// Unknown endpoint + error handler
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
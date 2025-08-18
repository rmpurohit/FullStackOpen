const mongoose = require('mongoose')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

async function main() {
  try {
    // Connect to MongoDB first, then start server
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')

    const server = app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })

    // Graceful shutdown
    const shutdown = (signal) => () => {
      logger.info(`Received ${signal}. Shutting down...`)
      server.close(async () => {
        await mongoose.connection.close()
        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown('SIGINT'))
    process.on('SIGTERM', shutdown('SIGTERM'))
  } catch (err) {
    logger.error('Failed to start server:', err)
    process.exit(1)
  }
}

main()
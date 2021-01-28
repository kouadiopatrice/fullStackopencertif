
const app = require('./App') // the actual Express application
const http = require('http')
const config = require('./Utile/config')
const logger = require('./Utile/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
}) //


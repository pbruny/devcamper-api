import express from 'express'
import logger from './middlewares/logger'
import routes from './routes'
import 'dotenv/config'
import './config/database'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(logger)
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
import express from 'express'
import 'dotenv/config'
import logger from './middlewares/logger'
import Youch from 'youch'
import routes from './routes'
import './config/database'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(logger)
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if(process.env.NODE_ENV === 'development') {
        const errors = new Youch(err, req).toJSON()

        return res.status(500).json(errors)
      }

      return res.status(500).json({error: 'Internal server error'})
    })
  }
}

export default new App().server
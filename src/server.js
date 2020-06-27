import App from './app'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({
  path: resolve(__dirname, '..', '.env')
})

App.listen(process.env.NODE_PORT || 3333)
import App from './app'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({
  path: resolve(__dirname, '..', '.env')
})

App.listen(process.env.NODE_PORT || 3333)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Server error: ${err.message}`)
  process.exit(1)
})
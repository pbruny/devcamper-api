import multer from 'multer'
import { resolve, extname } from 'path'
import crypto from 'crypto'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) callback (err)

        return callback(null, res.toString('hex') + extname(file.originalname))
      })
    }
  })
}
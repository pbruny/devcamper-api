import 'dotenv/config'
import fs from 'fs'
import { resolve } from 'path'
import Mongoose from 'mongoose'
import Bootcamp from '../models/Bootcamp'
import Course from '../models/Course'
import User from '../models/User'

Mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const bootcamps = JSON.parse(
  fs.readFileSync(
    resolve(__dirname, '..', 'data', 'bootcamps.json'), 
    'utf-8'
  )
)

const courses = JSON.parse(
  fs.readFileSync(
    resolve(__dirname, '..', 'data', 'courses.json'), 
    'utf-8'
  )
)

const users = JSON.parse(
  fs.readFileSync(
    resolve(__dirname, '..', 'data', 'users.json'), 
    'utf-8'
  )
)

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await User.create(users)

    console.log('Data imported')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

const destroyData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if(process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  destroyData()
}
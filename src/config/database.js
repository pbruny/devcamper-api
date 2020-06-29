import Mongoose from 'mongoose'

class Database {
  constructor() {
    this.mongo()
  }

  async mongo() {
    this.mongoConnection = await Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  
    console.log(`MongoDB connected: ${this.mongoConnection.connection.host}`)
  }
}

export default new Database()
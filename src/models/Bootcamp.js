import Mongoose from 'mongoose'
import Slugify from 'slugify'

const BootcampSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Please, add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 
      'Please, fill with a valid URL with http or https'
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot exceed 20 characters'],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please, add a valid e-mail'
    ],
  },
  address: {
    type: String,
    required: [true, 'Please, add an address'],
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAdress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rate must be at least 1'],
    max: [10, 'Rate cannot be greater than 10'],
  },
  averageCost: {
    type: Number,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

BootcampSchema.pre('save', function(next) {
  this.slug = Slugify(this.name, { lower: true })
  next()
})

export default Mongoose.model('Bootcamp', BootcampSchema)
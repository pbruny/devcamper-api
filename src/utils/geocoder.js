import Geocoder from 'node-geocoder'

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
}

const geocoder = Geocoder(options)

export default geocoder
import Bootcamp from '../models/Bootcamp'
import Geocoder from '../utils/geocoder'

class BootcampController {

  async index(req, res) {
    try {
      let query

      const reqQueryCopy = { ...req.query }

      const removeFields = ['select', 'sort']

      removeFields.forEach(param => delete reqQueryCopy[param])

      let queryString = JSON.stringify(reqQueryCopy)
      queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, wordMatch => `$${wordMatch}`)

      query = Bootcamp.find(JSON.parse(queryString))

      if(req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
      }

      if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
      }

      const bootcamps = await query


      return res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const bootcamp = await Bootcamp.findById(id)

      if (!bootcamp) {
        return res.status(400).json({success: false})
      }

      return res.status(200).json({success: true, data: bootcamp})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async showBootcampsInRadius(req, res) {
    const { zipcode, distance } = req.params
    const earthRadiusInKm = 6378
    const loc = await Geocoder.geocode(zipcode)
    const { latitude, longitude } = loc[0]

    const radius = distance / earthRadiusInKm

    const bootcamps = await Bootcamp.find({
      location:{
        $geoWithin: { 
          $centerSphere: [[ longitude, latitude], radius] 
        }
      }
    })

    return res.json({count: bootcamps.length, data: bootcamps})
  }


  async store(req, res) {
    try {
      const newBootcamp = await Bootcamp.create(req.body)
      return res.status(201).json({success: true, data: newBootcamp})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const bootcamp = await Bootcamp.findOneAndDelete({_id: id})

      if (!bootcamp) {
        return res.status(400).json({success: false})
      }

      return res.status(200).json({success: true, data: bootcamp})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      })

      if (!bootcamp) {
        return res.status(400).json({success: false})
      }

      return res.status(200).json({success: true, data: bootcamp}) 
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

}

export default new BootcampController
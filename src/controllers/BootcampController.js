import Bootcamp from '../models/Bootcamp'

class BootcampController {

  async index(req, res) {
    try {
      const bootcamps = await Bootcamp.find({})
      return res.status(200).json({success: true, data: bootcamps})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const bootcamp = await Bootcamp.findById(id)

      return res.status(200).json({success: true, data: bootcamp})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
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
      const bootcamp = await Bootcamp.findOneAndDelete({_id: id}, () => {
        console.log("Deleted the bootcamp ", id)
      })

      return res.status(200).json({success: true, data: bootcamp})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, () => {
        console.log(`Bootcamp updated ${bootcamp._id}`)
      })

      return res.status(200).json({success: true, data: bootcamp}) 
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

}

export default new BootcampController
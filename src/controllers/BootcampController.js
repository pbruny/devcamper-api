import Bootcamp from '../models/Bootcamp'

class BootcampController {

  async index(req, res) {
    return res.status(200).json({ok: true, data: "All bootcamps"})
  }

  async show(req, res) {
    return res.status(200).json({ok: true, data: `Show bootcamp ${req.params.id}`})
  }

  async store(req, res) {
    try {
      const newBootcamp = await Bootcamp.create(req.body)
      return res.status(201).json({sucess: true, data: newBootcamp})
    } catch (err) {
      return res.status(400).json({sucess: false, error: err.message})
    }
    
  }

  async delete(req, res) {
    return res.status(200).json({ok: true, data: "Deleted Bootcamp"})
  }

  async update(req, res) {
    return res.status(200).json({ok: true, data: "Updated bootcamp"})
  }

}

export default new BootcampController
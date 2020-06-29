class BootcampController {

  async index(req, res) {
    return res.status(200).json({ok: true, data: "All bootcamps"})
  }

  async show(req, res) {
    return res.status(200).json({ok: true, data: `Show bootcamp ${req.params.id}`})
  }

  async store(req, res) {
    return res.status(201).json({ok: true, data: "Created bootcamp"})
  }

  async delete(req, res) {
    return res.status(200).json({ok: true, data: "Deleted Bootcamp"})
  }

  async update(req, res) {
    return res.status(200).json({ok: true, data: "Updated bootcamp"})
  }

}

export default new BootcampController
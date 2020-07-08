import Bootcamp from '../models/Bootcamp'

class FileController {
  async store(req, res) {
    const { filename: path } = req.file

    const file = await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: path
    })

    if(!file) {
      return res.status(404).json({success: false, error: `Bootcamp with id ${req.params.id} not found`})
    }

    return res.status(200).json({success: true, photo: path})
  }
}

export default new FileController()
import Bootcamp from '../models/Bootcamp'

class FileController {
  async store(req, res) {
    const { filename: path } = req.file

    const file = await Bootcamp.findById(req.params.id)

    if(!file) {
      return res.status(404).json({success: false, error: `Bootcamp with id ${req.params.id} not found`})
    }

    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(400).json({success: false, error: `User with id of ${req.user.id} is not the owner of this bootcamp`})
    }

    const updateFile = await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: path
    })
    
    return res.status(200).json({success: true, photo: path})
  }
}

export default new FileController()
import Course from '../models/Course'
import Bootcamp from '../models/Bootcamp'

class CourseController {
  async index(req, res) {
    try {
      const courses = await Course.find()
  
      res.status(200).json({success: true, count: courses.length, data: courses})
    } catch (err) {
      res.status(400).json({success: false, error: err.message})
    }
  }
  async show(req, res) {
    try {
      const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
      })

      res.status(200).json({success: true, data: course})
    } catch (err) {
      res.status(400).json({success: false, error: err.message})
    }
  }

  async showByBootcamp(req, res) {
    try{
      const coursesByBootcamp = await Course.find({
        bootcamp: req.params.bootcampId
      }).populate({
        path: 'bootcamp',
        select: 'name description'
      })
  
      res.status(200).json({success: true, count: coursesByBootcamp.length, data: coursesByBootcamp})
    } catch (err) {
      res.status(400).json({success: false, error: err.message})
    }
  }

  async store(req, res) {
    try{
      req.body.bootcamp = req.params.bootcampId

      const bootcamp = await Bootcamp.findById(req.params.bootcampId)

      if(!bootcamp) {
        return res.status(404).json({success: false, error: `Bootcamp with id ${req.params.bootcampId} not found`})
      }

      const course = await Course.create(req.body)

      return res.status(201).json({success: true, data: course})
    } catch (err) {
      res.status(400).json({success: false, error: err.message})
    }
  }
}

export default new CourseController()
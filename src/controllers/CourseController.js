import Course from '../models/Course'
import Bootcamp from '../models/Bootcamp'

class CourseController {
  async index(req, res) {
    try {
      const courses = await Course.find()
  
      return res.status(200).json({success: true, count: courses.length, data: courses})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }
  async show(req, res) {
    try {
      const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
      })

      return res.status(200).json({success: true, data: course})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
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
  
      return res.status(200).json({success: true, count: coursesByBootcamp.length, data: coursesByBootcamp})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
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
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async update(req, res) {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })

      if(!course) {
        return res.status(404).json({success: false, error: `Course with id ${req.params.id} not found`})
      }

      return res.status(200).json({success: true, message: `Course with id ${req.params.id} successfully updated`, data: course})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async delete(req, res) {
    try {
      const course = await Course.findById(req.params.id)

      if(!course) {
        return res.status(404).json({success: false, error: `Course with id ${req.params.id} not found`})
      }

      await course.remove()

      return res.status(200).json({success: true, message: `Course with id ${req.params.id} successfully deleted`})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }
}

export default new CourseController()
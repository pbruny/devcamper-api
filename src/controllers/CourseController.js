import Course from '../models/Course'

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
}

export default new CourseController()
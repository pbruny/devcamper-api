import { Router } from 'express'
import BootcampController from './controllers/BootcampController'
import CourseController from './controllers/CourseController'


const routes = new Router()

routes.get('/api/v1/bootcamps', BootcampController.index)
routes.get('/api/v1/bootcamps/:id', BootcampController.show)
routes.get('/api/v1/bootcamps/:bootcampId/courses', CourseController.show)
routes.get('/api/v1/bootcamps/radius/:zipcode/:distance', BootcampController.showBootcampsInRadius)
routes.post('/api/v1/bootcamps', BootcampController.store)
routes.put('/api/v1/bootcamps/:id', BootcampController.update)
routes.delete('/api/v1/bootcamps/:id', BootcampController.delete)

routes.get('/api/v1/courses', CourseController.index)
routes.get('/api/v1/courses/bootcamp/:bootcampId', CourseController.showByBootcamp)
routes.get('/api/v1/courses/:id', CourseController.show)

export default routes
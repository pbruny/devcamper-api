import { Router } from 'express'
import BootcampController from './controllers/BootcampController'
import CourseController from './controllers/CourseController'
import multer from 'multer'
import multerconfig from './config/multer'
import FileController from './controllers/FileController'
import UserController from './controllers/UserController'


const routes = new Router()
const upload = multer(multerconfig)

routes.get('/api/v1/bootcamps', BootcampController.index)
routes.get('/api/v1/bootcamps/:id', BootcampController.show)
routes.get('/api/v1/bootcamps/:bootcampId/courses', CourseController.show)
routes.get('/api/v1/bootcamps/radius/:zipcode/:distance', BootcampController.showBootcampsInRadius)
routes.post('/api/v1/bootcamps', BootcampController.store)
routes.put('/api/v1/bootcamps/:id', BootcampController.update)
routes.delete('/api/v1/bootcamps/:id', BootcampController.delete)

routes.get('/api/v1/courses', CourseController.index)
routes.get('/api/v1/courses/bootcamp/:bootcampId', CourseController.showByBootcamp)
routes.post('/api/v1/bootcamps/:bootcampId/courses', CourseController.store)
routes.get('/api/v1/courses/:id', CourseController.show)
routes.delete('/api/v1/courses/:id', CourseController.delete)
routes.put('/api/v1/courses/:id', CourseController.update)

routes.post('/api/v1/:id/photo', upload.single('file'), FileController.store)

routes.post('/api/v1/users', UserController.store)
routes.post('/api/v1/users/login', UserController.login)
export default routes
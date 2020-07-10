import { Router } from 'express'
import BootcampController from './controllers/BootcampController'
import CourseController from './controllers/CourseController'
import multer from 'multer'
import multerconfig from './config/multer'
import FileController from './controllers/FileController'
import UserController from './controllers/UserController'
import AuthMiddleware from './middlewares/auth'
import VerifyRole from './middlewares/verifyRole'


const routes = new Router()
const upload = multer(multerconfig)

routes.get('/api/v1/bootcamps', BootcampController.index)
routes.get('/api/v1/bootcamps/:id', BootcampController.show)
routes.get('/api/v1/bootcamps/:bootcampId/courses', CourseController.show)
routes.get('/api/v1/bootcamps/radius/:zipcode/:distance', BootcampController.showBootcampsInRadius)
routes.post('/api/v1/bootcamps', AuthMiddleware, VerifyRole('publisher', 'admin'), BootcampController.store)
routes.put('/api/v1/bootcamps/:id', AuthMiddleware, VerifyRole('publisher', 'admin'), BootcampController.update)
routes.delete('/api/v1/bootcamps/:id', AuthMiddleware, VerifyRole('publisher', 'admin'), BootcampController.delete)

routes.get('/api/v1/courses', CourseController.index)
routes.get('/api/v1/courses/bootcamp/:bootcampId', CourseController.showByBootcamp)
routes.post('/api/v1/bootcamps/:bootcampId/courses', AuthMiddleware, VerifyRole('publisher', 'admin'), CourseController.store)
routes.get('/api/v1/courses/:id', CourseController.show)
routes.delete('/api/v1/courses/:id', AuthMiddleware, VerifyRole('publisher', 'admin'), CourseController.delete)
routes.put('/api/v1/courses/:id', AuthMiddleware, VerifyRole('publisher', 'admin'), CourseController.update)

routes.post('/api/v1/:id/photo', upload.single('file'), AuthMiddleware, VerifyRole('publisher', 'admin'), FileController.store)

routes.post('/api/v1/users', UserController.store)
routes.post('/api/v1/users/login', UserController.login)
routes.get('/api/v1/users/me', AuthMiddleware, UserController.showLoggedUser)

export default routes
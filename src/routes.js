import { Router } from 'express'
import BootcampController from './controllers/BootcampController'


const routes = new Router()

routes.get('/api/v1/bootcamps', BootcampController.index)
routes.get('/api/v1/bootcamps/:id', BootcampController.show)
routes.post('/api/v1/bootcamps', BootcampController.store)
routes.put('/api/v1/bootcamps/:id', BootcampController.update)
routes.delete('/api/v1/bootcamps/:id', BootcampController.delete)

export default routes
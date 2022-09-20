import { Router } from 'express'
import * as controller from '@/controllers/vehicles'

const router = Router()

router.get('/', controller.get)

router.post('/:id/parameters', controller.setVehicleParameters)


export default router
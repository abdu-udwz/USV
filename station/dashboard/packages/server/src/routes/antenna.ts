import { Router } from 'express'
import * as controller from '@/controllers/antenna'

const router = Router()

router.get('/', controller.get)
router.post('/', controller.openAntennaConnection)

export default router
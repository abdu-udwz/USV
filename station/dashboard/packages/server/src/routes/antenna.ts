import { Router } from 'express'
import * as controller from '@/controllers/antenna'

const router = Router()

router.get('/', controller.get)
router.post('/', controller.openAntennaConnection)

router.delete('/', controller.closeAntennaConnection)

export default router
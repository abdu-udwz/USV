import { Router, json, urlencoded } from 'express'
// sub-routers
import antennaRouter from './antenna'
import vehiclesRouter from './vehicles'

const router = Router()

/* enable body parser and qs */
router.use(json(), urlencoded({ extended: true }))

router.get('/', (req, res) => res.json({
  version: '0.0.1',
}))

router.use('/antenna', antennaRouter)
router.use('/vehicles', vehiclesRouter)

export default router
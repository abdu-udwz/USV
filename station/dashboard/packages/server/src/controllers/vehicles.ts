import { Request, Response, NextFunction } from 'express'

import * as vehiclesService from '@/services/vehicles'
// types
import type { GetVehiclesResBody, SetVehicleParametersReqBody } from 'common/types/vehicle'

export async function get (req: Request<any, GetVehiclesResBody>, res: Response<GetVehiclesResBody>, next: NextFunction): Promise<any> {
  try {
    res.json(
      Array.from(vehiclesService.vehiclesMap.values()))
  } catch (error: any) {
    next(error)
  }
}

interface SingleVehicleReqParams {
  id: string
}

export async function setVehicleParameters (
  req: Request<SingleVehicleReqParams, any, SetVehicleParametersReqBody>,
  res: Response, next: NextFunction) : Promise<void> {
  try {
    await vehiclesService.updateVehicleParameters(req.params.id, req.body)
    res.json(204)
  } catch (error: any) {
    next(error)
  }
}
import { Request, Response, NextFunction } from 'express'

import antenna, { 
  connect as antennaConnect,
  getAvailablePorts, 
  type PortInfo, 
} from '@/services/antenna'

interface GetResponseBase {
  availablePorts: PortInfo[]
}

interface GetResponseNotOpen extends GetResponseBase {
  isOpen: false
}

interface GetResponseOpen extends GetResponseBase {
  isOpen: true
  portInfo: Pick<PortInfo, 'path'> & { baudRate: number }
}

type GetResponse = GetResponseNotOpen | GetResponseOpen

export async function get (req: Request, res: Response<GetResponse>, next: NextFunction): Promise<any> {
  try {
    const availablePorts = await getAvailablePorts()
    if (antenna.isAvailable()) {
      return res.json({
        isOpen: true,
        availablePorts,
        portInfo: { 
          path: antenna.serialport!.path,
          baudRate: antenna.serialport!.baudRate,
        },
      })
       
    } else {
      res.json({
        isOpen: false,
        availablePorts,
      })
      return
    }
  } catch (error: any) {
    next(error)
  }
}


/*
 *  open connection
 */

interface OpenAntennaReqBody {
  baudRate?: number
  path?: string
}

export async function openAntennaConnection (req: Request<any, any, OpenAntennaReqBody>, res: Response<GetResponse>, next: NextFunction): Promise<any> {
  try {
    if (req.body.baudRate == null || req.body.path == null) {
      res.sendStatus(400)
      return 
    }

    antennaConnect({
      baudRate: req.body.baudRate,
      path: req.body.path,
    })

    res.sendStatus(202)
  } catch (error: any) {
    next(error)
  }
}

export type VehicleStatus =  'IDLING' | 'DEPLOYED'

export interface Vehicle {
  id: string
  status: VehicleStatus

  rudderAngle: number
  motorSpeed: number

  longitude: number
  latitude: number

  lastContactAt: Date
}

export type GetVehiclesResBody = Vehicle[]

export type SetVehicleParametersReqBody 
  = Partial<Pick<Vehicle, 'status' | 'rudderAngle' | 'motorSpeed' >>
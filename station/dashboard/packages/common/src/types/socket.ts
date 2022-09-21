// import { AntennaPortInfo } from './antenna'
import type { Vehicle } from './vehicle'
export interface ServerToClientEvents {

  antennaConnect: (portInfo: { path: string, baudRate: number } ) => void
  antennaDisconnect: () => void

  vehicleOnline: (vehicle: Vehicle) => void
  vehicleUpdate: (vehicle: Pick<Vehicle, 'id'> & Partial<Vehicle>) => void

  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
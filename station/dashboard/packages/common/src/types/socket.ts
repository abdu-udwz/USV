import type {  } from 'socket.io-client'
// import { AntennaPortInfo } from './antenna'
export interface ServerToClientEvents {
  antennaConnect: (portInfo: { path: string, baudRate: number } ) => void
  antennaDisconnect: () => void
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
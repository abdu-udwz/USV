/**
 * The main interface between the server and the hardware station antenna (comm tower)
 */

import { 
  SerialPort, 
  SerialPortOpenOptions,
} from 'serialport'
import type { PortInfo, AutoDetectTypes } from '@serialport/bindings-cpp'
export { PortInfo } from '@serialport/bindings-cpp'

import socketService from './socket'

interface Antenna {
  serialport: SerialPort | null
  isAvailable: () => boolean
}

const _antenna = {
  serialport: null,

  isAvailable () {
    return this.serialport?.isOpen
  },

} as Antenna


type AntennaConnectionOptions = 
  Pick<SerialPortOpenOptions<AutoDetectTypes>, 'baudRate' | 'path'>

function initialize (options: AntennaConnectionOptions): void {
  const serial = new SerialPort({ ...options })
  _antenna.serialport = serial

  serial.on('open', () => {
    console.log('antenna connected successfully')

    socketService.io.emit('antennaConnect', {
      path: serial.path,
      baudRate: serial.baudRate,
    })
  })
}

export function connect (options: AntennaConnectionOptions): Antenna {
  initialize(options)
  return _antenna
}

export async function getAvailablePorts (): Promise<PortInfo[]> {
  return SerialPort.list()
}

export default _antenna

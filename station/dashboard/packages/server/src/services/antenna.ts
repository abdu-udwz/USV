/**
 * The main interface between the server and the hardware station antenna (comm tower)
 */

import { 
  SerialPort, 
  SerialPortOpenOptions,
} from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import type { PortInfo, AutoDetectTypes } from '@serialport/bindings-cpp'
export { PortInfo } from '@serialport/bindings-cpp'

import socketService from './socket'

interface Antenna {
  serialport: SerialPort | null
  isAvailable: () => boolean

  in: ReadlineParser
  out: SerialPort
}

const inputStream = new ReadlineParser()

const _antenna = {
  serialport: null,

  isAvailable () {
    return this.serialport?.isOpen
  },

  in: inputStream,

  get out () {
    return this.serialport
  },
  
} as Antenna

_antenna.in.on('data', (messageStr: string) => {
  console.log('[AntennaService]: main input sink messages', messageStr)
  try {
    const message = JSON.parse(messageStr)
    inputStream.emit('message', message)
  } catch (error: any) {
    console.warn('[antenna]: unable to parse message, could be noise or bad formatted message')
    // console.warn(error)
  }
})

type AntennaConnectionOptions = 
  Pick<SerialPortOpenOptions<AutoDetectTypes>, 'baudRate' | 'path'>

function initialize (options: AntennaConnectionOptions): void {
  const serial = new SerialPort({ ...options })
  _antenna.serialport = serial

  serial.pipe(_antenna.in)

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

export function disconnect (): Promise<void> {
  return new Promise((resolve, reject) => {
    _antenna.serialport!.close((error) => {
      if (error != null)
        reject(error)
      else
        resolve()
    })
  })
}

export async function getAvailablePorts (): Promise<PortInfo[]> {
  return SerialPort.list()
}

export default _antenna

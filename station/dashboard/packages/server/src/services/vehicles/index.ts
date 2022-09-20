import antennaService from '../antenna'
import socketService from '../socket'

import type {
  Vehicle,
  VehicleStatus,
} from 'common/types/vehicle'

interface VehicleMessageBase {
  vehicleId: string
}

interface VehicleMessageWithStatus {
  status: VehicleStatus
}

interface PingMessage extends VehicleMessageBase, VehicleMessageWithStatus {
  operation: 'ping'
  timestamp: number
  status: VehicleStatus
}

interface GPSUpdateMessage extends VehicleMessageBase {
  operation: 'gpsUpdate'
  lat: number
  lon: number
}

interface GPSIssueMessage extends VehicleMessageBase {
  operation: 'gpsError'
  angle: number
  message: string
}

interface ErrorMessage extends VehicleMessageBase {
  operation: 'error'
  message: string
}

type VehicleMessage = PingMessage | GPSUpdateMessage | GPSIssueMessage | ErrorMessage

// internal incoming

export const vehiclesMap = new Map<string, Vehicle>()

/**
 * 
 * @param vehData 
 * @returns 
 */
export function createVehicleIfNotExisting (vehData: Pick<Vehicle, 'id' | 'status'>): void {
  if (vehiclesMap.has(vehData.id)) {
    return
  }

  console.log('[vehicle service]: new vehicle detected', vehData.id)
  vehiclesMap.set(vehData.id, {
    status: vehData.status,
    id: vehData.id,
    lastContactAt: new Date(),

    motorSpeed: 0,
    rudderAngle: 0,

    longitude: 0,
    latitude: 0,
    locationError: false,
  })

  socketService.io.emit('vehicleOnline', vehiclesMap.get(vehData.id)!)
}


function handleVehicleMessage (data: VehicleMessage): void {
  createVehicleIfNotExisting({
    id: data.vehicleId, 
    status: 'status' in data ? data.status :  'DEPLOYED',
  })

  const targetVehicle =  vehiclesMap.get(data.vehicleId)!
  targetVehicle.lastContactAt = new Date()

  if (data.operation == 'error') {
    console.error('[VehicleSever]: error on vehicle')
    console.error(data.vehicleId)
    console.error(data.message)
    console.error('==============')
  }

  if (data.operation === 'gpsUpdate') {
    targetVehicle.latitude = data.lat
    targetVehicle.longitude = data.lon

    targetVehicle.locationError = false
  }

  if (data.operation == 'gpsError') {
    console.warn('[VehiclesService]:', data.vehicleId, 'vehicle cannot use gps properly.')
    targetVehicle.locationError = true
  }

  emitVehicleUpdate(data.vehicleId)
}

function emitVehicleUpdate (id: string): void {
  socketService.io.emit('vehicleUpdate', vehiclesMap.get(id)!)
}

antennaService.in.on('message', (message: VehicleMessage) => {
  handleVehicleMessage(message)
})

interface StationMessageBase {
  vehicleId: string
}

interface UpdateRudderMessage extends StationMessageBase {
  operation: 'updateRudderAngle'
  angle: number
}

interface UpdateMotorMessage extends StationMessageBase {
  operation: 'updateMotor'
  speed: number
}

export type StationMessage = UpdateRudderMessage | UpdateMotorMessage

async function sendStationMessage (message: StationMessage): Promise<void> {
  console.log('[VehiclesService]: outgoing station message', message)
  await antennaService.out.port!.write(Buffer.from(JSON.stringify(message) + '\n'))
}

export async function updateVehicleParameters (
  vehicleId: string, 
  params: Partial<Pick<Vehicle, 'status' | 'motorSpeed' | 'rudderAngle'>>): Promise<void> {

  if (params.motorSpeed != null) {
    await sendStationMessage({
      vehicleId,
      operation: 'updateMotor',
      speed: params.motorSpeed,
    })

    vehiclesMap.get(vehicleId)!.motorSpeed = params.motorSpeed
  }

  if (params.rudderAngle != null) {
    await sendStationMessage({
      vehicleId,
      operation: 'updateRudderAngle',
      angle: params.rudderAngle + 90,
    })

    vehiclesMap.get(vehicleId)!.rudderAngle = params.rudderAngle
  }

  emitVehicleUpdate(vehicleId)
}
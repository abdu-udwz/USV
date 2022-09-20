import { parseVehicleMessage } from '../'

describe('Input message parsing', () => {
  it('should return false with incomplete url', () => {
    expect(parseVehicleMessage('operation=ping&vehicl')).toBe(false)
  })

  it('should have all the parameters and values parsed', () => {
    expect(parseVehicleMessage('http://usv.io?operation=ping&vehicleId=1993')).toMatchObject({
      operation: 'ping',
      vehicleId: '1993',
    })
  })
})
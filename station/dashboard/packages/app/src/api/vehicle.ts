import api from './api'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// types
import type { GetVehiclesResBody, SetVehicleParametersReqBody } from 'common/types/vehicle'

export async function getVehicles (config?: AxiosRequestConfig): Promise<AxiosResponse<GetVehiclesResBody, any>> {
  return api.get('/vehicles', config)
}

export async function setVehicleParameters (vehicleId: string, parameters: SetVehicleParametersReqBody, config?: AxiosRequestConfig): Promise<AxiosResponse> {
  return api.post(`/vehicles/${vehicleId}/parameters`, parameters)  
}
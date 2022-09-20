import api from './api'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function getStatus (): Promise<AxiosResponse> {
  return api.get('/antenna')
}

export async function openConnection (options: any): Promise<AxiosResponse> {
  return api.post('/antenna', options)
}

export async function closeConnection (config?: AxiosRequestConfig): Promise<AxiosResponse> {
  return api.delete('/antenna', config)
}


import api from './api'
import type { AxiosResponse } from 'axios'

export async function getStatus (): Promise<AxiosResponse> {
  return api.get('/antenna')
}

export async function openConnection (options: any): Promise<AxiosResponse> {
  return api.post('/antenna', options)
}
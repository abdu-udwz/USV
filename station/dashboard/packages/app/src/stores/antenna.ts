import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import * as antennaService from '@/api/antenna'
import socketService from '@/plugins/socket'

// types
import type { AntennaPortInfo } from 'common/types/antenna'

export const useAntennaStore = defineStore('antenna', () => {

  const connected = ref(false)
  const availablePorts = ref<AntennaPortInfo[]>([])
  const openPortInfo = reactive<Pick<AntennaPortInfo, 'path'>>({
    path: '',
  })
  
  const openingConnection = ref(false)

  /* 
   * connection-related
   */
  socketService.on('antennaConnect', (info) => {
    connected.value = true
    openingConnection.value = false
    openPortInfo.path = info.path
  })

  async function checkAndUpdateStatus (): Promise<void> {
    try {
      const res = await antennaService.getStatus()
      
      availablePorts.value = res.data.availablePorts
      connected.value = res.data.isOpen

      if (res.data.isOpen) {
        openPortInfo.path = res.data.portInfo.path
      }
    } catch (error: any) {
      console.error('[antenna store]:', error)
    }
  }

  async function openConnection (options: { path: string, baudRate: number }): Promise<void> {
    openingConnection.value = true
    try {
      await antennaService.openConnection(options)
    } catch (error: any) {
      //
    }
  }

  return { 
    connected, 
    openPortInfo,
    availablePorts,
    openingConnection,

    checkAndUpdateStatus,
    openConnection,
  }
})

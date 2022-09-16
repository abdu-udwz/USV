import { ref } from 'vue'
import { defineStore } from 'pinia'

import socketService from '@/plugins/socket'

export const useSocketStore = defineStore('socket', () => {
  const connected = ref(false)

  socketService.on('connect', () => {
    console.log('[socket]: connected successfully')
    connected.value = true
  })

  socketService.on('disconnect', () => {
    connected.value = false
  })

  socketService.onAny((...args) => {
    console.log('socket', ...args)
  })

  return { connected }
})

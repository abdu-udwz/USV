import { ref, computed,  watch } from 'vue'
import { defineStore } from 'pinia'
import debounce from 'debounce'

import { useAntennaStore } from './antenna'
import * as vehicleService from '@/api/vehicle'
import socketService from '@/plugins/socket'

// types
import type { Vehicle } from 'common/types/vehicle'

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicles = ref<Vehicle[]>([])
  const selectedId = ref<string | null>(null)

  const selected = computed(() => {
    return vehicles.value.find(veh => veh.id === selectedId.value) ?? null
  })

  const loadingVehicles = ref(false)

  function addVehicleIfNotExists (vehicle: Vehicle): void {
    const oldIndex = vehicles.value.findIndex((local) => local.id === vehicle.id)
    if (oldIndex === -1) {
      vehicles.value.push(vehicle)

    }
  }

  // handle socket updates
  socketService.on('vehicleOnline', addVehicleIfNotExists)

  socketService.on('vehicleUpdate', (updatedVehicle) => {
    const oldIndex = vehicles.value.findIndex((local) => local.id === updatedVehicle.id)
    if (oldIndex === -1) {
      return 
    }

    Object.assign(vehicles.value[oldIndex], updatedVehicle)
  })

  const debouncedParamsUpdate = debounce(vehicleService.setVehicleParameters, 150)
  watch(() => selected.value?.rudderAngle, async (value) => {
    if (selected.value == null) {
      return 
    }

    debouncedParamsUpdate(selected.value.id, {
      rudderAngle: value,
    })
  })

  watch(() => selected.value?.motorSpeed, async (value) => {
    if (selected.value == null) {
      return
    }

    debouncedParamsUpdate(selected.value.id, { motorSpeed: value })
  })

  async function getVehicles (): Promise<void> {
    try {
      loadingVehicles.value = true
      const res = await vehicleService.getVehicles()
      vehicles.value = []
      vehicles.value.push(...res.data)

    } catch (error: any) {
      console.error(error)
    } finally {
      loadingVehicles.value = false
    }
  }

  const antenna = useAntennaStore()
  watch(() => antenna.connected, (value) => {
    if (!value) {
      vehicles.value = []
      selectedId.value = null
    }
  })

  return { 
    vehicles,

    selectedId,
    selected,
    
    loadingVehicles,
    getVehicles,
  }
})

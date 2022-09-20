<script setup lang="ts">
import { ref, watch } from 'vue'
import { MapboxMap, MapboxMarker } from 'vue-mapbox-ts'

// store
import { useVehicleStore  } from '@/stores/vehicle'

const vehicle = useVehicleStore()

const mapAccessToken: string = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string

const mapCenter = ref<[number, number]>([15.090616, 32.383091])
const autoCenter = ref(false)
const mapZoom = ref(12)

const vehiclesCords = ref<[number, number]>([15.090610, 32.383091])
watch([
  () => vehicle.selected?.longitude, 
  () => vehicle.selected?.latitude,
], ([longitude, latitude]) => {


  vehiclesCords.value = [longitude ?? 15.090610, latitude ?? 32.383091]
  if (autoCenter.value) {
    mapCenter.value = [...vehiclesCords.value]
  }
}, { immediate: true })

</script>

<template>
  <MapboxMap
    v-model:center="mapCenter"
    v-model:zoom="mapZoom"
    :access-token="mapAccessToken"
    map-style="light-v10"
    height="400px"
  >
    <MapboxMarker :lng-lat="vehiclesCords" />
  </MapboxMap>  
  <!-- cord display -->
  <VCard tag="section">
    <VAlert
      :model-value="vehicle.selected?.locationError == true"
      type="warning"
      border
      variant="tonal"
      class="ma-2"
    >
      <VAlertTitle class="text-capitalize">
        GPS signal lost or weak
      </VAlertTitle>
        
      <p>
        The vehicle's on-board GPS device cannot determine the exact location of the vehicle. Signal maybe weak or blocked by surroundings (e.g. buildings), check the connections and consider operating in open areas.
      </p>
    </VAlert>
    <VCardText class="d-flex">
      <VTextField 
        :model-value="vehiclesCords[0]"
        readonly
        variant="solo"
      />

      <VTextField 
        :model-value="vehiclesCords[1]"
        readonly
        variant="solo"
        class="ms-2"
      />

      <VSpacer />
      <VCheckbox
        v-model="autoCenter"
        label="Follow mode"
        title="Automatically follow vehicle when location updates."
      />
    </VCardText>
  </VCard>
</template>
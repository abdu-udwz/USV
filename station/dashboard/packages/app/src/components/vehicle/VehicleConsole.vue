<script setup lang="ts">
import VehicleMapView from './VehicleMapView.vue'
import VehicleRudderControl from './VehicleRudderControl.vue'
import VehicleMotorControl from './VehicleMotorControl.vue'
import { useVehicleStore } from '@/stores/vehicle'

const vehicle = useVehicleStore().selected
</script>

<template>
  <VToolbar>
    <VToolbarTitle>Vehicle <span class="text-subtitle-1">{{ vehicle?.id }}</span></VToolbarTitle>
  </VToolbar>

  <VSheet>
    <VRow
      justify="center"
      align="stretch"
      align-content="stretch"
      dense
    >
      <!-- map -->
      <VCol cols="12">
        <VehicleMapView />
      </VCol>
      <VCol
        tag="section"
        cols="12"
        lg="5"
      >
        <VehicleMotorControl />
      </VCol>
      <!-- rudder -->
      <VCol
        tag="section"
        cols="12"
        lg="5"
      >
        <VehicleRudderControl />
      </VCol>
      <!-- Air conditions -->
      <VCol
        tag="section"
        cols="12"
        lg="2"
      >
        <VCard
          title="Air conditions"
          height="100%"
        >
          <VCardText class="text-center">
            <p>Humidity {{ vehicle?.humidity != null ? `${vehicle.humidity}%` : 'NaN' }}</p>
            <p>Temp.  {{ vehicle?.temperature != null ? `${vehicle?.temperature} C` : 'NaN' }}&deg;</p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VSheet>
</template>
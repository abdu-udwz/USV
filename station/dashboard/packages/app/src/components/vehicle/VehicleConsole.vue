<script setup lang="ts">
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
    <VRow justify="center">
      <!-- map -->
      <VCol cols="12">
        <VSheet
          color="grey-lighten-1"
          height="400"
        />
      </VCol>
      <VCol
        tag="section"
        cols="12"
        lg="6"
      >
        <VehicleMotorControl />
      </VCol>
      <!-- rudder -->
      <VCol
        tag="section"
        cols="12"
        lg="6"
      >
        <VehicleRudderControl />
      </VCol>
    </VRow>
  </VSheet>
</template>
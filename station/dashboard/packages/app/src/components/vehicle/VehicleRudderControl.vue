<script setup lang="ts">
import { computed } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'

const vehicle = useVehicleStore().selected

const internalModelValue = computed<number>({
  set (value) {
    if (vehicle != null) {
      vehicle.rudderAngle = value
    }
  },
  get () {
    return vehicle?.rudderAngle ?? 0
  },
})
</script>

<template>
  <VCard 
    title="Rudder"
    subtitle="Configure rudder angle."
  >
    <VCardText>
      <VSlider 
        v-model="internalModelValue"
        prepend-icon="mdi-steering"
        color="primary"
        min="-90"
        max="90"
        step="10"
        tick-size="4"
        show-ticks="always"
        track-color="transparent"
        track-fill-color="transparent"
        thumb-label
        track-size="6"
      >
        <template #thumb-label=" { modelValue} ">
          {{ modelValue }}&nbsp;&deg;
        </template>
      </VSlider>
      <p class="text-center text-medium-emphasis text-body-1">
        <span>Current angle {{ internalModelValue }}&deg;</span>
      </p>
    </VCardText>
  </VCard>
</template>


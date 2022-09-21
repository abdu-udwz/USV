<script setup lang="ts">
import { computed } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'

const vehicle = useVehicleStore().selected

const internalSpeed = computed<number>({
  set (value) {
    if (vehicle != null) {
      vehicle.motorSpeed = value
    }
  },
  get () {
    return vehicle?.motorSpeed ?? 0
  },
})

const speedIcon = computed(() => {
  let color = 'grey'
  let icon = 'mdi-signal-cellular-outline'

  if (internalSpeed.value > 1) {
    icon = 'mdi-signal-cellular-1'
    color = 'blue-grey-lighten-1'
  } 

  if (internalSpeed.value > 15) {
    color = 'blue-grey-darken-1'
  }

  if (internalSpeed.value > 25) {
    color = 'green'
  }

  if (internalSpeed.value > 36) {
    icon = 'mdi-signal-cellular-2'
  } 

  if (internalSpeed.value > 38) {
    color = 'light-green'
  }

  if (internalSpeed.value > 51) {
    color = 'orange'
  }

  if (internalSpeed.value > 75) {
    icon = 'mdi-signal-cellular-3'
    color = 'orange-darken-1'
  }

  if (internalSpeed.value > 82) {
    color = 'orange-darken-3'
  }

  if (internalSpeed.value > 90) {
    color = 'red'
  }

  return {
    icon,
    color,
  }
})

</script>
<template>
  <VCard
    class="text--secondary"
    title="Motor"
    subtitle="Control the vehicle's onboard moving motor."
  >
    <VCardText>
      <VSlider
        v-model="internalSpeed"
        label="Speed"
        :color="speedIcon.color"
        step="5"
        show-ticks="always"
        thumb-label
        :ticks="[0, 25, 50, 75, 100]"
      >
        <template #prepend>
          <VIcon 
            size="34"
            :icon="speedIcon.icon"
            :color="speedIcon.color"
          />
        </template>

        <template #thumb-label="{ modelValue}">
          {{ modelValue }}&percnt;
        </template>
      </VSlider>

      <p class="text-center text-medium-emphasis text-body-1">
        <span>Current speed {{ internalSpeed }}&percnt;</span>
      </p>
    </VCardText>
  </VCard>
</template>
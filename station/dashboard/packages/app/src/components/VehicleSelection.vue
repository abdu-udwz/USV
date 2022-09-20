<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVehicleStore } from '@/stores/vehicle'

const vehicle = useVehicleStore()

// fetch vehicles upon startup
vehicle.getVehicles()

// selection

const selectionArr = ref<string[]>([])
watch(() => selectionArr.value[0], (value) => {
  vehicle.selectedId = value
})

</script>

<template>
  <VCard
    tag="section"
    :loading="vehicle.loadingVehicles"
  >
    <VCardTitle class="d-flex ">
      <h2 class="text-h6">
        Vehicles
      </h2>
      <VSpacer />
      <VBtn
        variant="tonal"
        icon="mdi-reload"
        density="compact"
        @click="vehicle.getVehicles"
      />
    </VCardTitle>

    <VList
      v-model:selected="selectionArr"
      mandatory
    >
      <VListItem
        v-for="veh of vehicle.vehicles"
        :key="veh.id"
        :value="veh.id"
        :title="veh.id"
      >
        <VListItemSubtitle>
          {{ veh.lastContactAt }}
        </VListItemSubtitle>
      </VListItem>
    </VList>
  </VCard>
</template>
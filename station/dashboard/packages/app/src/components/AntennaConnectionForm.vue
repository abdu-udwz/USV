<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useAntennaStore } from '@/stores/antenna'
// types
// import type { AntennaPortInfo } from 'common/types/antenna'

// Antenna connection
const antenna = useAntennaStore()

// port path
const portPath = ref<string>('')

function autoSelectCheck (): void {
  if (antenna.availablePorts.length !== 0) {
    portPath.value = antenna.availablePorts[0].path
  }
}

onMounted(autoSelectCheck)
watch(() => antenna.availablePorts, autoSelectCheck)

// render
function getAntennaPortName (item: any): string {
  return item.path
}

// baud rate
const baudRateOptions = [
  110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000, 256000,
]
const baudRate = ref(9600)

async function onSubmit (): Promise<void> {
  // validate
  console.log('should now connect with the following details',
    portPath.value,
    baudRate.value,
  )

  await antenna.openConnection({
    path: portPath.value as string,
    baudRate: baudRate.value,
  })
} 

</script>

<template>
  <VForm
    @submit.prevent="onSubmit"
  >
    <VCard
      title="Setup Antenna Connection"
      subtitle="The antenna module is not connected. "
      :loading="antenna.openingConnection"
      :disabled="antenna.openingConnection"
      class="mx-auto"
      max-width="400px"
    >
      <VCardText>
        <VSelect
          v-model="portPath"
          label="Port name"
          :items="antenna.availablePorts"
          item-value="path"
          :item-title="getAntennaPortName"
        />
            
        <VSelect
          v-model="baudRate"
          label="Baud rate"

          :items="baudRateOptions"
        />
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="primary"
          variant="elevated"
          type="submit"
        >
          Open connection
        </VBtn>
      </VCardActions>
    </VCard>
  </VForm>
</template>
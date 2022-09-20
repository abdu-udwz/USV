<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
// components
import VehicleSelection from '@/components/VehicleSelection.vue'
/*
 * socket.io
 */
import socketService from '@/plugins/socket'
import { useSocketStore } from '@/stores/socket'

import { useAntennaStore } from '@/stores/antenna'
import AntennaConnectionForm from '@/components/AntennaConnectionForm.vue'

import { useVehicleStore } from '@/stores/vehicle'
import VehicleConsole from './components/vehicle/VehicleConsole.vue'

const socket = useSocketStore()
onBeforeMount(() => {
  socketService.connect()
})

// Antenna connection
const antenna = useAntennaStore()

onMounted(async () => {
  try {
    await antenna.checkAndUpdateStatus()
  } catch (error: any) {
    console.log('Antenna error:', error)
  }
})


// vehicle console
const vehicle = useVehicleStore()

</script>

<template>
  <VApp>
    <VAppBar>
      <VAppBarTitle>
        USV
      </VAppBarTitle>
    </VAppBar>
    <VNavigationDrawer>
      <VList>
        <VListItem title="Server connection">
          <template #prepend>
            <VIcon
              :color="socket.connected ? 'green' : 'red'"
              icon="mdi-circle"
            />
          </template>
        </VListItem>

        <VListItem
          title="Antenna connection"
          :subtitle="antenna.connected ? antenna.openPortInfo.path : ''"
        >
          <template #prepend>
            <VIcon
              :color="antenna.connected ? 'green' : 'red'"
              icon="mdi-circle"
            />
          </template>

          <template
            v-if="antenna.connected"
            #append
          >
            <VIcon
              title="Close connection with antenna"
              icon="mdi-close"
              @click="antenna.closeConnection"
            />
          </template>
        </VListItem>
      </VList>

      <VDivider />
      <VehicleSelection
        v-if="antenna.connected"
      />
    </VNavigationDrawer>

    <VMain name="app-content">
      <VContainer>
        <VRow>
          <!--  antenna connection form -->
          <VCol 
            v-if="!antenna.connected"
            cols="12"
          >
            <AntennaConnectionForm />
          </VCol>

          <!-- vehicle console -->
          <VCol
            v-if="antenna.connected"
          >
            <div
              v-if="vehicle.selected == null"
              class="d-flex flex-column justify-center align-center text-medium-emphasis"
            >
              <VCardTitle class="">
                No vehicle selected
              </VCardTitle>
              <VCardSubtitle>
                You need to select a vehicle from the side bar first to view and control its component.
              </VCardSubtitle>
            </div>
            <VehicleConsole v-else />
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VApp>
</template>

<style scoped>

</style>

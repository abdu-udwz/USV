<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'

/*
 * socket.io
 */
import socketService from '@/plugins/socket'
import { useSocketStore } from '@/stores/socket'

import { useAntennaStore } from '@/stores/antenna'
import AntennaConnectionForm from './components/AntennaConnectionForm.vue'

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
</script>

<template>
  <VApp>
    <VAppBar>
      <VAppBarTitle>
        USV
      </VAppBarTitle>
    </VAppBar>

    <VMain>
      <VRow>
        <VCol cols="12">
          <!--  antenna connection -->
          <AntennaConnectionForm v-if="!antenna.connected" />
        </VCol>
      </VRow>
    </VMain>

    <VNavigationDrawer
      location="end"
      permanent
    >
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
        </VListItem>
      </VList>
    </VNavigationDrawer>
  </VApp>
</template>

<style scoped>

</style>

<template>
  <div class="hidden lg:block">big screen not supported yet</div>

  <PhoneTable class="lg:hidden">
    <template #content>
      <thead class="border-t-0"></thead>
      <tbody class="bg-white">
        <PhoneTableRow
          :header="$t('No route')"
          :footer1="$t('No route is selected')"
        />
      </tbody>
      <tbody class="bg-white">
        <Tabs
          :selected-tab-index="0"
          :classes="'justify-center mt-2 mb-2'"
          @selected-tab-changed="selectedTabChanged"
        >
          <Tab :title="$t('All routes')"></Tab>
          <Tab :title="$t('My routes')"></Tab>
        </Tabs>
      </tbody>
      <tbody v-for="(r, index) in routes" :key="index" class="bg-white">
        <PhoneTableRow
          :header="r.description"
          :footer1="routeFooter(r)"
          :clickable="true"
        />
      </tbody>
      <PhoneTableSection />
      <!-- Empty section -->
    </template>
  </PhoneTable>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useMsal } from '../auth/useMsal'

import { useOrdersStore } from '../stores/ordersStore'
import { useRoutesStore } from '../stores/routesStore'
import { useCustomersStore } from '../stores/customersStore'

import ApiService from '../api/apiService'

import PhoneTable from '../components/PhoneTable.vue'
import PhoneTableRow from '../components/PhoneTableRow.vue'
import PhoneTableSection from '../components/PhoneTableSection.vue'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'

import Route from '../types/Route'

const routesStore = useRoutesStore()

const { t } = useI18n()

const apiService = new ApiService(useMsal())

const routes = ref<Route[]>()

const selectedTabIndex = ref(0)

const selectedTabChanged = async (i: number) => {
  selectedTabIndex.value = i
}

routesStore.$persistedState.isReady().then(async () => {
  if (!routesStore.routes) {
    routesStore.routes = await apiService.get('routes')
  }
  routes.value = routesStore.routes
})

const sampleCount = (r: Route) => {
  if (r.waypoints) {
    return r.waypoints.reduce((acc, wp) => {
      return (
        acc +
        wp.places.reduce((acc, p) => {
          return acc + (p.samplesCount ?? 0)
        }, 0)
      )
    }, 0)
  } else {
    return 0
  }
}

const routeFooter = (r: Route) => {
  console.log(r.waypoints)
  if (r.waypoints) {
    let sCount = sampleCount(r)
    console.log(sCount)
    let samplesText = sCount > 1 ? t('samples') : t('sample')
    let wCount = r.waypoints.length
    let waypointsText = wCount > 1 ? t('locations') : t('location')
    return `${sCount} ${samplesText} ${t('distributed on')} ${waypointsText}`
  }
  return ''
}
</script>

<template>
  <div class="lg:block hidden w-full">
    <h1
      class="font-medium leading-tight text-4xl text-center text-gray-600 my-2"
    >
      Routes
    </h1>
    <div class="flex w-full">
      <WeekCalendar
        :routes="routes"
        @day-double-clicked="calendarDayDoubleClicked"
        @item-double-clicked="calendarItemDoubleClicked"
      />
    </div>
  </div>
  <PhoneTable class="lg:hidden">
    <template #content>
      <PhoneTableSection :title="t('Map of orders')" />
      <tbody class="bg-white">
        <PhoneTableRow
          :clickable="true"
          :header="t('Show Map')"
          :footer1="t('Click here to see orders and sample collectors')"
          @row-clicked="showMapClicked"
        />
      </tbody>
      <PhoneTableSection :title="t('Route')" />
      <tbody class="bg-white">
        <PhoneTableRow
          v-if="selectedRoute"
          :clickable="true"
          :header="selectedRoute.description"
          :footer1="selectedRoute.description"
        />
        <PhoneTableRow
          v-else
          :clickable="true"
          :header="t('No route')"
          :footer1="t('Click here to select a route')"
          @row-clicked="selectRoute"
        />
      </tbody>
    </template>
  </PhoneTable>
</template>

<script setup lang="ts">
import WeekCalendar from '../components/WeekCalendar.vue'
import PhoneTable from '../components/PhoneTable.vue'
import PhoneTableRow from '../components/PhoneTableRow.vue'
import PhoneTableSection from '../components/PhoneTableSection.vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { ChevronRightIcon } from '@heroicons/vue/solid'
import { useRouter, useRoute } from 'vue-router'
import { useMsal } from '../auth/useMsal'
import { useRoutesStore } from '../stores/routesStore'

import ApiService from '../api/apiService'

import Route from '../types/Route'
import CalendarItem from '../types/CalendarItem'

const apiService = new ApiService(useMsal())

const routesStore = useRoutesStore()

const { t } = useI18n()
const router = useRouter()

const selectedRoute = ref<Route>()
const routes = ref<Route[]>()

const selectRoute = () => {
  router.push('/scheduling/routes')
}

const routeFooter = computed(() => {
  if (
    sampleCount.value &&
    selectedRoute.value &&
    selectedRoute.value.waypoints
  ) {
    let sCount = sampleCount.value
    let samplesText = sCount > 1 ? t('samples') : t('sample')
    let wCount = selectedRoute.value.waypoints.length
    let waypointsText = wCount > 1 ? t('locations') : t('location')
    return `${sCount} ${samplesText} ${t('distributed on')} ${waypointsText}`
  }
  return ''
})

const sampleCount = computed(() => {
  if (selectedRoute.value?.waypoints) {
    return selectedRoute.value.waypoints.reduce((acc, wp) => {
      return (
        acc +
        wp.places.reduce((acc, p) => {
          return acc + p.samplesCount
        }, 0)
      )
    }, 0)
  } else {
    return 0
  }
})

routesStore.$persistedState.isReady().then(async () => {
  if (routesStore.routes) {
    // and not old
  } else {
    routesStore.routes = await apiService.get<Route[]>('routes')
    console.log(routesStore.routes)
  }
  routes.value = routesStore.routes
})

// Create new route
const showMapClicked = async () => {
  console.log('show map')
  const selectedRoute: Route = {
    routeId: 0,
    scheduledSampling: new Date(),
    description: 'New Route',
    waypoints: [],
  }
  routesStore.selectedRoute = selectedRoute
  console.log(routesStore.selectedRoute)
  router.push('/scheduling/orders')
}

// Create new route
const calendarDayDoubleClicked = async (d: Date) => {
  const selectedRoute: Route = {
    routeId: 0,
    scheduledSampling: new Date(),
    description: 'New route',
    waypoints: [],
  }
  routesStore.selectedRoute = selectedRoute
  router.push('/scheduling/orders')
}

const calendarItemDoubleClicked = async (item: CalendarItem) => {
  const selectedRoute: Route = {
    routeId: item.id,
    scheduledSampling: item.startDate,
    description: item.title,
    waypoints: [],
  }
  routesStore.selectedRoute = selectedRoute
  router.push('/scheduling/orders')
}
</script>

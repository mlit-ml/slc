<template>
  <Suspense>
    <template #fallback>
      <div>FALLBACK</div>
    </template>
    <template #default>
      <div class="w-screen max-w-full">
        <Tabs
          :selected-tab-index="selectedTabIndex"
          :classes="'mb-2'"
          @selected-tab-changed="selectedTabChanged"
        >
          <Tab :title="$t('Overview')">
            <OrdersOverview
              :selected-route="selectedRoute"
              @map-is-ready="mapIsReady"
              @order-added="orderAdded"
              @order-removed="orderRemoved"
          /></Tab>
          <Tab :title="$t('Route details')">
            <RouteDetails :selected-route="selectedRoute"
          /></Tab>
        </Tabs>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOrdersStore } from '../stores/ordersStore'
import { useRoutesStore } from '../stores/routesStore'
import { useLoading } from 'vue-loading-overlay'

import OrdersOverview from '../components/OrdersOverview.vue'
import RouteDetails from '../components/RouteDetails.vue'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'

import 'vue-loading-overlay/dist/vue-loading.css'

import ApiService from '../api/apiService'
import { useMsal } from '../auth/useMsal'

import Route from '../types/Route'
import Order from '../types/Order'

const loading = useLoading()
const router = useRouter()
const ordersStore = useOrdersStore()
const routesStore = useRoutesStore()

const apiService = new ApiService(useMsal())

const selectedTabIndex = ref(0)

const selectedRoute = ref<Route>()

const orderAdded = (id: number) => {
  const order = ordersStore.orders?.filter(o => {
    return o.orderId == id
  })[0]

  if (selectedRoute.value && order) {
    selectedRoute.value.orders.push(order)
  }
}

const orderRemoved = (id: number) => {
  const order = ordersStore.orders?.filter(o => {
    return o.orderId == id
  })[0]

  if (selectedRoute.value && order) {
    const filtered = selectedRoute.value.orders.filter((order: Order) => {
      return order.orderId != id
    })
    selectedRoute.value.orders = filtered
  }
}

ordersStore.$persistedState.isReady().then(async () => {
  if (ordersStore.selectedTabIndex) {
    selectedTabIndex.value = ordersStore.selectedTabIndex
    ordersStore.selectedTabIndex = 0 // reset
  }
})

selectedTabIndex.value = 0

routesStore.$persistedState.isReady().then(async () => {
  if (!routesStore.selectedRoute) {
    // old
    /*  const response = await apiService.get<Route>(
      `routes/${routesStore.selectedRoute.routeId}`,
    )
    selectedRoute.value = response */
  } else {
    selectedRoute.value = routesStore.selectedRoute
  }
})

const selectedTabChanged = async (i: number) => {
  selectedTabIndex.value = i
}

const loader = loading.show({
  isFullPage: true,
  loader: 'dots',
  canCancel: false,
})

setTimeout(() => {
  loader.hide()
}, 5000)

const mapIsReady = async () => {
  loader.hide()
}
</script>

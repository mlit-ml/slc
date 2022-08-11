<template>
  <GMapMap
    class="pb-48"
    :center="center"
    :zoom="9"
    :options="{
      gestureHandling: 'greedy',
    }"
    map-type-id="terrain"
    @click="closeInfoWindow"
    @idle="emit('mapIsReady')"
  >
    <!--     <GMapCluster
      :zoom-on-click="true"
      :minimum-cluster-size="12"
      :grid-size="5"
      :max-zoom="9"
    > -->
    <GMapMarker
      v-for="(m, index) in markers"
      :key="index"
      :position="m.position"
      :clickable="m.clickable"
      :draggable="m.draggable"
      :icon="m.icon"
      @click="markerClicked(m, index)"
    >
      <div v-if="openedMarkerId === m.id">
        <GMapInfoWindow
          :v-if="openedMarkerId === m.id"
          :closeclick="true"
          @closeclick="closeInfoWindow"
        >
          <GMapDialog
            :id="m.id"
            :header="m.infoWindow.header"
            :footer="m.infoWindow.footer"
            :button-text="m.infoWindow.buttonText"
            @add-to-route-clicked="addToRoute"
            @info-clicked="showOrder"
          />
        </GMapInfoWindow>
      </div>
    </GMapMarker>
    <!--     </GMapCluster> -->
  </GMapMap>
  <div
    class="grid grid-cols-6 gap-7 items-center absolute w-full bottom-0 right-0"
    style="padding-bottom: 9.5rem"
  >
    <button>
      <component :is="GlobeIcon" class="text-indigo-600 w-6 h-6"></component>
    </button>
    <div class="col-span-4">
      <Slider class="w-full"></Slider>
    </div>
    <!--     <div class="hidden lg:block">
      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Save changes
      </button>
    </div> -->
    <button class="justify-self-end">
      <!-- </div> class="lg:hidden"> -->
      <component :is="RefreshIcon" class="text-indigo-600 w-6 h-6"></component>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '../stores/ordersStore'
import { useRoutesStore } from '../stores/routesStore'
import { useMsal } from '../auth/useMsal'

import GMapDialog from '../components/GMapDialog.vue'
import Slider from './Slider.vue'

import { GlobeIcon } from '@heroicons/vue/solid'
import { RefreshIcon } from '@heroicons/vue/solid'

import GMarker from '../types/GMarker'
import Order from '../types/Order'
import Route from '../types/Route'

import pathIcons from '../path-icons.json'

import ApiService from '../api/apiService'
import GMarkerIcon from '@/types/GMarkerIcon'

const props = defineProps<{
  selectedRoute?: Route
}>()

const apiService = new ApiService(useMsal())

const router = useRouter()
const ordersStore = useOrdersStore()
const routesStore = useRoutesStore()

const { t } = useI18n()

const center = ref({ lat: 56.993048, lng: 9.8212 })
const openedMarkerId = ref()

var orders = ref<Order[]>()
const selectedRoute = ref<Route | undefined>(props.selectedRoute)

watch(
  () => props.selectedRoute,
  (newValue, oldValue) => {
    selectedRoute.value = newValue
  },
)

const markers = computed(() => {
  if (!orders.value) {
    return []
  }
  return orders.value.map((o: Order): GMarker => {
    return {
      id: o.orderId,
      position: {
        lat: o.latitude,
        lng: o.longitude,
      },
      icon: getIcon(o),
      clickable: true,
      draggable: false,
      infoWindow: {
        header: o.description,
        footer:
          t('Samples:') +
          ' ' +
          o.samples
            .map(x => x.place)
            .reduce((acc, obj) => {
              return acc + obj.samplesCount
            }, 0),
        buttonText: o.routeOrderNo ? t('Remove') : t('Add'),
      },
    }
  })
})

function addLeadingZeros(num: number, totalLength: number): string {
  return String(num).padStart(totalLength, '0')
}

const getIcon = (o: Order): GMarkerIcon | string => {
  if (o.routeOrderNo) {
    return '/images/markers/black' + addLeadingZeros(o.routeOrderNo, 2) + '.png'
  } else {
    const icon = {
      path: pathIcons.INDUSTRY,
      scale: 1.0,
      strokeColor: 'black',
      strokeOpacity: 0.1,
      fillColor: 'black',
      fillOpacity: 1.0,
      anchor: {
        x: 15,
        y: 30,
      },
    }
    return icon
  }
}

ordersStore.$persistedState.isReady().then(async () => {
  if (!ordersStore.orders) {
    // OR orders fetch date is old
    const response = await apiService.get<Order[]>('orders')
    orders.value = response
    ordersStore.orders = orders.value
  } else {
    orders.value = ordersStore.orders
  }
})

const emit = defineEmits<{
  (e: 'mapIsReady'): void
  (e: 'orderAdded', id: number): void
  (e: 'orderRemoved', id: number): void
}>()

const addToRoute = async (id: number) => {
  let order = orders.value?.filter(o => {
    return o.orderId == id
  })[0]

  if (order && orders.value && selectedRoute.value) {
    if (order?.routeOrderNo) {
      order.routeOrderNo = undefined

      let i = 1
      orders.value
        .filter(o => {
          return o.routeOrderNo
        })
        .sort((a, b) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return a.routeOrderNo! - b.routeOrderNo!
        })
        .forEach(o => {
          o.routeOrderNo = i++
        })

      emit('orderRemoved', id)
    } else {
      console.error(selectedRoute.value.waypoints.length)
      order.routeOrderNo = selectedRoute.value.waypoints.length + 1
      emit('orderAdded', id)
    }
  }

  openedMarkerId.value = null
}

const showOrder = async (id: number) => {
  router.push({ name: 'Order', params: { orderId: id.toString() } })
}

const closeInfoWindow = async () => {
  openedMarkerId.value = null
}

const markerClicked = async (m: GMarker, index: number) => {
  openedMarkerId.value = m.id as null | number
}
</script>

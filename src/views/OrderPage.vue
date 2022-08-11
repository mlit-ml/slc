<template>
  <div class="hidden lg:block">big screen not supported yet</div>

  <PhoneTable class="lg:hidden">
    <template #content>
      <thead class="border-t-0"></thead>
      <GMapMap
        :center="mapCenter"
        :zoom="16"
        :options="{
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          clickableIcons: false,
          keyboardShortcuts: false,
        }"
        map-type-id="terrain"
        class="w-full h-32"
      >
        <GMapMarker :key="1" :position="mapCenter"> </GMapMarker>
      </GMapMap>
      <tbody class="bg-white">
        <PhoneTableRow
          :clickable="true"
          :header="customer?.name"
          :footer1="customer?.address"
          :footer2="customer?.city"
          :hyperlink="
            encodeURI(
              'https://www.google.com/maps/dir/?api=1&destination=' +
                order?.latitude +
                ',' +
                order?.longitude +
                '&travelmode=driving',
            )
          "
        />
      </tbody>
      <PhoneTableSection :title="$t('Contact:') + ' ' + customer?.name" />
      <tbody class="bg-white">
        <PhoneTableRow
          :header="$t('Telephone')"
          :footer1="customer?.phone"
          :hyperlink="`tel:${customer?.phone}`"
        />
        <PhoneTableRow
          :header="$t('Mobile')"
          :footer1="customer?.mobile"
          :hyperlink="`tel:${customer?.mobile}`"
        />
        <PhoneTableRow
          :header="$t('E-mail')"
          :footer1="customer?.email"
          :hyperlink="`mailto: ${customer?.email}`"
        />
      </tbody>
      <PhoneTableSection :title="$t('Sampling notes:')" />
      <tbody class="bg-white">
        <PhoneTableRow :text-area="true" />
      </tbody>
      <PhoneTableSection :title="$t('Sampling:')" />
      <tbody class="bg-white">
        <PhoneTableRow
          :header="$t('Select sampling date and time')"
          :footer1="scheduledSampling ? dateAndTime(scheduledSampling) : ''"
          :date-input="true"
          :date-initial="scheduledSampling"
          @date-changed="scheduledSamplingChanged"
        />
      </tbody>
      <PhoneTableSection :title="$t('Samples:')" />
      <tbody class="bg-white">
        <PhoneTableRow
          v-for="s in order?.samples"
          :key="s.sampleId"
          :header="s.place.name"
          :footer1="s.type"
          :footer2="s.label"
          :clickable="true"
          @row-clicked="sampleClicked(s.sampleId)"
        />
      </tbody>
      <PhoneTableSection :title="$t('Add order')" />
      <tbody class="bg-white">
        <PhoneTableRow
          :header="$t('Add to route')"
          :footer1="$t('Adds order to route with the selected sampling date')"
          :clickable="true"
          @row-clicked="addToRoute"
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
import Order from '../types/Order'
import Customer from '../types/Customer'

import { dateAndTime } from '../helpers/dateHelpers'
import router from '@/router'
import Route from '@/types/Route'

const ordersStore = useOrdersStore()
const routesStore = useRoutesStore()
const customersStore = useCustomersStore()

const { t } = useI18n()
const route = useRoute()

const mapCenter = computed(() => {
  return {
    lat: order.value?.latitude ?? 0,
    lng: order.value?.longitude ?? 0,
  }
})

const selectedRoute = ref<Route>()
const order = ref<Order>()
const customer = ref<Customer>()

const apiService = new ApiService(useMsal())

const scheduledSampling = ref<Date>()

const orderId = computed(() => {
  const split = route.path.split('/')
  return parseInt(split[split.length - 1])
})

const scheduledSamplingChanged = (d: Date) => {
  scheduledSampling.value = d
}

const addToRoute = () => {
  if (order.value && selectedRoute.value) {
    ordersStore.selectedTabIndex = 1
    order.value.routeOrderNo = selectedRoute.value.orders.length + 1
    selectedRoute.value.orders.push(order.value)
    router.push('/scheduling/orders')
  }
}

const sampleClicked = (sampleId: number) => {
  router.push({
    name: 'OrderSample',
    params: {
      orderId: orderId.value.toString(),
      sampleId: sampleId.toString(),
    },
  })
}

if (routesStore.selectedRoute) {
  scheduledSampling.value = new Date(
    routesStore.selectedRoute.scheduledSampling.toString(),
  )
  selectedRoute.value = routesStore.selectedRoute
}

ordersStore.$persistedState.isReady().then(async () => {
  if (!ordersStore.orders) {
    // OR orders fetch date is old
    const response = await apiService.get<Order>(`orders/${orderId.value}`)
    order.value = response
  } else {
    const filtered = ordersStore.orders.filter(o => o.orderId == orderId.value)
    order.value = filtered[0] // filtered[0]
  }

  order.value.samples = [
    {
      sampleId: 22,
      type: 'Drinking water assesment',
      label: 'Group A analysis',
      place: {
        name: 'Martins Place',
        latitude: 57,
        longitude: 9,
        samplesCount: 1,
      },
    },
  ]

  customersStore.$persistedState.isReady().then(async () => {
    /* if (!customersStore.customers) {
      // OR customer fetch date is old
      const response = await apiService.get<Customer>(
        `customers/${order.value?.customerId}`,
      )
      customer.value = response
    } else {
      const filtered = customersStore.customers.filter(
        c => c.customerId == order.value?.customerId,
      )
      customer.value = filtered[0]
    } */
    customer.value = {
      city: 'Aalborg',
      customerId: 2,
      email: 'martin.lykke@sgs.com',
      mobile: '+4531503854',
      name: 'Martin',
      phone: '+4531503854',
      address: 'Søparken 35',
    }
  })
})
</script>

<style scoped>
textarea {
  resize: none;
  overflow: hidden;
  min-height: 50px;
  max-height: 100px;
}
</style>

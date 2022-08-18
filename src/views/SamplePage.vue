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
                sample?.place?.latitude +
                ',' +
                sample?.place?.longitude +
                '&travelmode=driving',
            )
          "
        />
      </tbody>
      <PhoneTableSection :title="$t('Contact:') + ' ' + customer?.name" />
      <tbody class="bg-white">
        <PhoneTableRow
          :header="$t('Telefon')"
          :footer1="customer?.phone"
          :hyperlink="`tel:${customer?.phone}`"
        />
        <PhoneTableRow
          :header="$t('Mobil')"
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
        <PhoneTableRow :text-area="''" />
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

import { useSamplesStore } from '../stores/samplesStore'
import { useRoutesStore } from '../stores/routesStore'
import { useCustomersStore } from '../stores/customersStore'

import ApiService from '../api/apiService'

import PhoneTable from '../components/PhoneTable.vue'
import PhoneTableRow from '../components/PhoneTableRow.vue'
import PhoneTableSection from '../components/PhoneTableSection.vue'
import Sample from '../types/Sample'
import Customer from '../types/Customer'

import { dateAndTime } from '../helpers/dateHelper'
import router from '@/router'

const samplesStore = useSamplesStore()
const routesStore = useRoutesStore()
const customersStore = useCustomersStore()

const { t } = useI18n()
const route = useRoute()

const mapCenter = computed(() => {
  return {
    lat: sample.value?.place.latitude ?? 0,
    lng: sample.value?.place.longitude ?? 0,
  }
})

const sample = ref<Sample>()
const customer = ref<Customer>()

const apiService = new ApiService(useMsal())

const sampleId = computed(() => {
  const split = route.path.split('/')
  return parseInt(split[split.length - 1])
})

samplesStore.$persistedState.isReady().then(async () => {
  if (!samplesStore.samples) {
    // OR orders fetch date is old
    const response = await apiService.get<Sample>(`samples/${sampleId.value}`)
    sample.value = response
  } else {
    const filtered = samplesStore.samples.filter(
      s => s.sampleId == sampleId.value,
    )
    sample.value = samplesStore.samples[0] // filtered[0]
  }

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

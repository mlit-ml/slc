<template>
  <div class="hidden lg:block">big screen not supported yet</div>

  <PhoneTable class="lg:hidden">
    <template #content>
      <PhoneTableSection :title="$t('Sample no:') + ' ' + sample?.sampleId" />
      <tbody class="bg-white">
        <PhoneTableRow
          :header="sample?.place.name"
          :footer1="sample?.type"
          :footer2="sample?.scope"
        />
        <PhoneTableRow :footer1="$t('Created by:') + ' ' + sample?.createdBy" />
      </tbody>
      <PhoneTableSection />
      <tbody class="bg-white">
        <PhoneTableRow :header="$t('Sample label')" text-input="" />
        <PhoneTableRow :header="$t('Sampling point')" text-input="" />
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

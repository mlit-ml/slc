<template>
  <div class="hidden lg:block">big screen not supported yet</div>
  <PhoneTable class="lg:hidden">
    <template #content>
      <template v-if="!props.showUnsavedRoute && selectedRoute?.guid">
        <PhoneTableSection :title="$t('Route')" />
        <tbody class="bg-white">
          <PhoneTableRow
            :clickable="true"
            :header="$t('No route')"
            :footer1="$t('Click here to select a route')"
            @row-clicked="emit('routeSelected')"
          />
        </tbody>
      </template>
      <template v-else>
        <PhoneTableSection :title="$t('Route')" />
        <tbody class="bg-white">
          <PhoneTableRow
            v-if="props.editable"
            :text-input="selectedRoute?.description"
            :footer1="RouteHelper.getInstance().routeFooter(selectedRoute!)"
            @row-clicked="emit('routeSelected')"
            @text-input-changed="routeDescriptionChanged"
          />
          <PhoneTableRow
            v-else
            :clickable="true"
            :header="selectedRoute?.description"
            :footer1="RouteHelper.getInstance().routeFooter(selectedRoute!)"
            @row-clicked="emit('routeSelected')"
          />
        </tbody>

        <PhoneTableSection :title="$t('Directions')" />
        <tbody v-if="hasOrders" class="bg-white">
          <template v-for="(o, index) in selectedRoute!.orders" :key="index">
            <hr class="border" />
            <PhoneTableRow
              :clickable="true"
              :header="'First waypoint'"
              :footer1="'Address'"
              :footer2="'Samples collected'"
              :no-borders="true"
              :styles="'padding-left:1.5rem'"
              @row-clicked="showOrder(o.orderId)"
            >
              <div class="absolute ml-5 w-5">
                <div
                  class="bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"
                />
                <div
                  class="bg-gray-300 w-3 h-3 rounded-full mt-1 m-auto place-self-center"
                />
                <div
                  style=""
                  class="bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"
                />
                <div
                  class="bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"
                />
                <div
                  class="bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"
                />
              </div>
            </PhoneTableRow>
          </template>
          <hr class="border ml-6" />
          <PhoneTableRow
            :header="'Home'"
            :footer1="'Address'"
            :no-borders="true"
            :styles="'padding-left:1.5rem'"
          >
            <div class="absolute ml-5 w-5">
              <div
                class="bg-gray-300 w-1 h-1 rounded-full mt-1 m-auto place-self-center"
              />
              <component
                :is="LocationMarkerIcon"
                class="text-gray-300 w-5 h-5 mt-1 m-auto place-self-center"
              ></component>
            </div>
          </PhoneTableRow>
          <hr class="border" />
        </tbody>
        <tbody v-else class="bg-white">
          <PhoneTableRow
            :header="'No directions to show'"
            :footer1="'Add orders to the route in the overview'"
          />
        </tbody>
        <template v-if="selectedRoute?.packaging">
          <PhoneTableSection :title="$t('Packaging')" />
          <tbody class="bg-white">
            <template
              v-for="(p, index) in selectedRoute?.packaging"
              :key="index"
            >
              <PhoneTableRow
                :header="'First bottle'"
                :footer1="'description'"
              />
            </template>
          </tbody>
        </template>
        <PhoneTableSection />
        <!-- Empty section -->
      </template>
    </template>
  </PhoneTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoutesStore } from '../stores/routesStore'
import { useMsal } from '../auth/useMsal'

import PhoneTable from '../components/PhoneTable.vue'
import PhoneTableRow from '../components/PhoneTableRow.vue'
import PhoneTableSection from '../components/PhoneTableSection.vue'

import GMapDialog from '../components/GMapDialog.vue'
import GMarker from '../types/GMarker'
import Order from '../types/Order'
import Place from '../types/Place'
import Route from '../types/Route'

import 'vue-loading-overlay/dist/vue-loading.css'

import ApiService from '../api/apiService'
import RouteHelper from '../helpers/routeHelper'
import StringHelper from '../helpers/stringHelper'

import { LocationMarkerIcon } from '@heroicons/vue/solid'

const props = defineProps<{
  selectedRoute?: Route
  showUnsavedRoute: boolean
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'routeSelected'): void
}>()

const apiService = new ApiService(useMsal())

const router = useRouter()
const routesStore = useRoutesStore()

const selectedRoute = ref<Route>()

const showOrder = async (id: number) => {
  router.push({ name: 'Order', params: { orderId: id.toString() } })
}

const routeDescriptionChanged = (t: string) => {
  if (selectedRoute.value) {
    selectedRoute.value.description = t
    if (!selectedRoute.value.guid) {
      selectedRoute.value.guid = StringHelper.uuidv4()
      routesStore.routes?.push(selectedRoute.value)
    } else {
      const index = routesStore.routes?.findIndex(
        x => x.guid == selectedRoute.value?.guid,
      )
      if (index) {
        routesStore.routes?.splice(index, 1, selectedRoute.value)
      }
    }
  }
}

const hasOrders = computed(() => {
  if (selectedRoute.value?.orders) {
    return selectedRoute.value.orders.length > 0
  }
  return false
})

routesStore.$persistedState.isReady().then(async () => {
  if (routesStore.selectedRoute) {
    // and not old
  } else {
    apiService.get('routes/{}')
  }
  selectedRoute.value = routesStore.selectedRoute
})
</script>

<template>
  <div class="hidden lg:block">big screen not supported yet</div>

  <PhoneTable class="lg:hidden">
    <template #content>
      <thead class="border-t-0"></thead>
      <tbody class="bg-white">
        <PhoneTableRow
          v-if="selectedRoute"
          :header="selectedRoute.description"
          :footer1="$t('Click here to deselect current route')"
          @row-clicked="deselectRoute"
        />
        <PhoneTableRow
          v-else
          :header="$t('No route')"
          :footer1="$t('Select a route below')"
          @row-clicked="deselectRoute"
        />
      </tbody>
      <tbody class="bg-white">
        <Tabs
          :selected-tab-index="0"
          :classes="'justify-center mt-2 mb-2 pb-2'"
          @selected-tab-changed="selectedTabChanged"
        >
          <Tab :title="$t('All routes')">
            <PhoneTable class="lg:hidden -mt-2">
              <template #content>
                <thead class="border-t-0"></thead>
                <tbody
                  v-for="(r, index) in sortRoutes(routes)"
                  :key="index"
                  class="bg-white"
                >
                  <PhoneTableRow
                    :header="r.description"
                    :footer1="RouteHelper.getInstance().routeFooter(r)"
                    :clickable="true"
                    @row-clicked="routeSelected(r)"
                  />
                </tbody>
                <PhoneTableSection />
              </template>
            </PhoneTable>
          </Tab>
          <Tab :title="$t('My routes')">
            <PhoneTable class="lg:hidden">
              <template #content>
                <thead class="border-t-0"></thead>
                <tbody
                  v-for="(r, index) in sortRoutes(routes).filter(r =>
                    accountMatch(r.sampleCollector?.email),
                  )"
                  :key="index"
                  class="bg-white"
                >
                  <PhoneTableRow
                    :header="r.description"
                    :footer1="RouteHelper.getInstance().routeFooter(r)"
                    :clickable="true"
                    @row-clicked="routeSelected(r)"
                  />
                </tbody>
                <PhoneTableSection />
              </template> </PhoneTable
          ></Tab>
        </Tabs>
      </tbody>
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
import router from '../router'

import RouteHelper from '../helpers/routeHelper'

const routesStore = useRoutesStore()
const ordersStore = useOrdersStore()

const { t } = useI18n()

const { accounts } = useMsal()

const apiService = new ApiService(useMsal())

const selectedRoute = ref<Route>()
const routes = ref<Route[]>()

const selectedTabIndex = ref(0)

const sortRoutes = (routes: Route[] | undefined): Route[] => {
  if (routes) {
    const sorted = routes.sort(
      (a, b) => +b.scheduledSampling - +a.scheduledSampling,
    )
    return sorted
  }
  return []
}

const deselectRoute = () => {
  routesStore.selectedRoute = undefined
  router.push('/scheduling')
}

const accountMatch = (email: string | undefined): boolean => {
  if (email) {
    return accounts.value.some(a => a.username == email)
  }
  return false
}

const selectedTabChanged = async (i: number) => {
  selectedTabIndex.value = i
}

const routeSelected = async (route: Route) => {
  routesStore.selectedRoute = route
  router.push('/scheduling')
}

routesStore.$persistedState.isReady().then(async () => {
  if (!routesStore.routes) {
    routesStore.routes = await apiService.get('routes')
  }
  selectedRoute.value = routesStore.selectedRoute
  routes.value = routesStore.routes
})
</script>

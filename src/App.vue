<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { useRouter, useRoute, RouteRecordNormalized } from 'vue-router'
import { useIsAuthenticated } from './auth/useIsAuthenticated'

import Sidebar from './components/Sidebar.vue'
import ServiceWorkerToast from './components/ServiceWorkerToast.vue'
import AuthDialog from './components/AuthDialog.vue'

import PageHistory from './types/PageHistory'

const appName =
  getCurrentInstance()?.appContext.config.globalProperties.$AppName

const router = useRouter()
const route = useRoute()
const isAuthenticated = useIsAuthenticated()

const pathRegex = /[a-zA-Z]+$/

const validRoutes = router.getRoutes()

const enableSlideoutTouch = ref(true)

if (route.name == 'Orders') {
  enableSlideoutTouch.value = false
}

watch(route, value => {
  enableSlideoutTouch.value = route.name != 'Orders'
})

const matchPaths = (path: string): RouteRecordNormalized[] => {
  const split = path.split('/')

  var params = split.filter(p => {
    return p.length > 0 && !pathRegex.test(p)
  })

  const matches = validRoutes
    .sort((a, b) => b.path.length - a.path.length)
    .filter(r => {
      let validSplit = r.path.split('/')
      let isMatch = true

      if (r.path == '/') return true

      for (let i = 0; i < validSplit.length; i++) {
        if (!isMatch) break

        if (split[i] == validSplit[i]) {
          isMatch = true
        } else if (validSplit[i][0] == ':') {
          isMatch = !pathRegex.test(split[i])
        } else {
          isMatch = false
        }
      }
      return isMatch
    })

  matches.forEach(p => {
    let split = p.path.split('/')
    let index = 0
    for (let i = 0; i < split.length; i++) {
      if (split[i].includes(':')) {
        split[i] = params[index++]
      }
    }
    p.path = split.join('/')
  })

  return matches
}

const fixRouteName = (name: string | undefined) => {
  if (name == 'OrderSample') {
    return 'Sample'
  }
  return name
}

const pageHistory = computed(() => {
  const matches = matchPaths(route.path)

  const history: PageHistory = {
    currentPage: {
      name:
        matches.length == 1
          ? appName
          : fixRouteName(matches[0].name?.toString()),
      path: matches[0].path,
    },
    previousPage: {
      name: matches.length > 1 ? fixRouteName(matches[1].name?.toString()) : '',
      path: matches.length > 1 ? matches[1].path : '',
    },
  }
  return history
})

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
</script>

<template>
  <AuthDialog v-if="!isAuthenticated" />
  <Sidebar
    :page-history="pageHistory"
    :enable-slideout-touch="enableSlideoutTouch"
  >
    <template #content>
      <div id="page" class="max-w-7xl mx-auto px-4 sm:px-6 flex">
        <RouterView />
      </div>
    </template>
  </Sidebar>
  <ServiceWorkerToast />
</template>

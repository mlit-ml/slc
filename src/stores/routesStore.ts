import { defineStore } from 'pinia'
import { ref } from 'vue'
import Route from '../types/Route'

export const useRoutesStore = defineStore('routes', () => {
  const selectedRoute = ref<Route>()
  const routes = ref<Route[]>()
  /*  
  const login = async () => {
    //const result = await auth.loginPopup()
    user.value = undefined //{ email: 'martin.lykke@sgs.com' } //await auth.getUser()
  }

  const logout = async () => {
    //  await auth.logout()
    user.value = undefined
  } */

  return {
    selectedRoute,
    routes,
  }
})

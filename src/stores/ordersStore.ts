import Order from '../types/Order'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>()
  const selectedTabIndex = ref<number>()
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
    orders,
    selectedTabIndex,
  }
})

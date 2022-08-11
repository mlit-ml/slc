import Sample from '../types/Sample'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSamplesStore = defineStore('samples', () => {
  const samples = ref<Sample[]>()

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
    samples,
  }
})

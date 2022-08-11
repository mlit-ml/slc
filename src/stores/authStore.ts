import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from 'oidc-client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()

  const login = async () => {
    //const result = await auth.loginPopup()
    user.value = undefined //{ email: 'martin.lykke@sgs.com' } //await auth.getUser()
  }

  const logout = async () => {
    //  await auth.logout()
    user.value = undefined
  }

  return {
    user,
    login,
    logout,
  }
})

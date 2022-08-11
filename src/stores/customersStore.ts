import Customer from '../types/Customer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref<Customer[]>()

  return {
    customers,
  }
})

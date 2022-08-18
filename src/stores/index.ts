import { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'
import { Deserialize } from 'cerialize'

export const plugin: Plugin = app => {
  const pinia = createPinia()

  pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: async key => {
          const item = localforage.getItem(key)
          return item
        },
        setItem: async (key, value) => {
          console.error('set', key)
          return localforage.setItem(key, value)
        },
        removeItem: async key => {
          console.error('remove', key)
          return localforage.removeItem(key)
        },
      },
    }),
  )

  app.use(pinia)
}

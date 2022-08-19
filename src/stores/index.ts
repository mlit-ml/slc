import { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'

export const plugin: Plugin = app => {
  const pinia = createPinia()

  pinia.use(
    createPersistedStatePlugin({
      overwrite: false,
      storage: {
        getItem: async key => {
          const item = localforage.getItem(key)
          return item
        },
        setItem: async (key, value) => {
          return localforage.setItem(key, value)
        },
        removeItem: async key => {
          return localforage.removeItem(key)
        },
      },
    }),
  )

  app.use(pinia)
}

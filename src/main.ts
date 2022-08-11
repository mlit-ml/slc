import { createApp } from 'vue'
import { plugin as storePlugin } from './stores'
import { createI18n } from 'vue-i18n'

import { msalPlugin } from './plugins/msalPlugin'
import { msalInstance } from './auth/authConfig'
import { AuthenticationResult, EventType } from '@azure/msal-browser'
import { CustomNavigationClient } from './router/NavigationClient'

import VueLoading from 'vue-loading-overlay'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import VueScrollPicker from 'vue-scroll-picker'

import messages from '@intlify/vite-plugin-vue-i18n/messages'

import 'vue-scroll-picker/lib/style.css'
import './assets/css/tailwind.css'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
})

// The next 2 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
const navigationClient = new CustomNavigationClient(router)
msalInstance.setNavigationClient(navigationClient)

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}
msalInstance.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult
    const account = payload.account
    msalInstance.setActiveAccount(account)
  }
})

// Only if you want hot module replacement when translation message file change
/* if (import.env.hot) {
  import.env.hot.on('locales-update', data => {
    Object.keys(data).forEach(lang => {
      i18n.global.setLocaleMessage(lang, data[lang])
    })
  })
} */

const app = createApp(App)

app.config.globalProperties.$AppName = 'Appens Navn'

app
  .use(VueLoading)
  .use(msalPlugin, msalInstance)
  .use(storePlugin)
  .use(i18n)
  .use(router)
  .use(VueScrollPicker)
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GMAP_API_KEY,
    },
  })

router.isReady().then(() => {
  // Waiting for the router to be ready prevents race conditions when returning from a loginRedirect or acquireTokenRedirect
  app.mount('#app')
})

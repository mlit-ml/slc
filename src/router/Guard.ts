import { RouteLocationNormalized, Router } from 'vue-router'
import { msalInstance, loginRequest } from '../auth/authConfig'
import {
  InteractionType,
  PopupRequest,
  PublicClientApplication,
  RedirectRequest,
} from '@azure/msal-browser'

import { useRoutesStore } from '../stores/routesStore'

const routerBase = import.meta.env.VITE_ROUTER_BASE

export function registerGuard(router: Router) {
  router.beforeEach(
    async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const routesStore = useRoutesStore()

      if (to.fullPath != routerBase && to.meta.requiresAuth) {
        const request = {
          ...loginRequest,
          redirectStartPage: to.fullPath,
        }
        const shouldProceed = await isAuthenticated(
          msalInstance,
          InteractionType.Redirect,
          request,
        )

        if (to.fullPath.includes('/orders')) {
          const routesStore = useRoutesStore()
          await routesStore.$persistedState.isReady()
          if (!routesStore.selectedRoute) {
            return '/scheduling'
          }
        }
        return shouldProceed
      }

      return true
    },
  )
}

export async function isAuthenticated(
  instance: PublicClientApplication,
  interactionType: InteractionType,
  loginRequest: PopupRequest | RedirectRequest,
): Promise<boolean> {
  // If your application uses redirects for interaction, handleRedirectPromise must be called and awaited on each page load before determining if a user is signed in or not
  return instance
    .handleRedirectPromise()
    .then(() => {
      const accounts = instance.getAllAccounts()
      if (accounts.length > 0) {
        return true
      }

      // User is not signed in and attempting to access protected route. Sign them in.
      if (interactionType === InteractionType.Popup) {
        return instance
          .loginPopup(loginRequest)
          .then(() => {
            return true
          })
          .catch(() => {
            return false
          })
      } else if (interactionType === InteractionType.Redirect) {
        return instance
          .loginRedirect(loginRequest)
          .then(() => {
            return true
          })
          .catch(() => {
            return false
          })
      }

      return false
    })
    .catch(() => {
      return false
    })
}

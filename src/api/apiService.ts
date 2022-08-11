import ApiResponse from '../types/ApiResponse'
import User from '../types/User'
import { Buffer } from 'buffer'

import { loginRequest } from '../auth/authConfig'
import { MsalContext, useMsal } from '../auth/useMsal'
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from '@azure/msal-browser'

const apiUrl = import.meta.env.VITE_API_BASE_URL

export default class ApiService {
  private msalContext: MsalContext
  constructor(msalContext: MsalContext) {
    this.msalContext = msalContext
  }

  private async myFetch<T>(
    msalContext: MsalContext,
    endpoint: string,
    method: string,
  ): Promise<T> {
    const response = await msalContext.instance
      .acquireTokenSilent({
        ...loginRequest,
      })
      .catch(async e => {
        console.log(e)
        if (e instanceof InteractionRequiredAuthError) {
          await msalContext.instance.acquireTokenRedirect(loginRequest)
        }
        throw e
      })
    if (msalContext.inProgress.value === InteractionStatus.None) {
      const headers = new Headers()
      const bearer = `Bearer ${response.accessToken}`

      headers.append('Authorization', bearer)

      const options = {
        method: method,
        headers: headers,
      }

      return new Promise(resolve => {
        return fetch(endpoint, options)
          .then(response => response.json())
          .then(body => {
            resolve(body)
          })
          .catch(error => {
            console.log(error)
            throw error
          })
      })
    }
    throw new Error('Unexpected issue with MSAL')
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.myFetch(this.msalContext, apiUrl + endpoint, 'GET')
  }
}

import { LogLevel, PublicClientApplication } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: 'c87f31ab-9387-49b5-be69-caee2b79ff4c',
    authority:
      'https://login.microsoftonline.com/f7ac070b-64a9-401a-8bcc-17660a80dbda',
    redirectUri: import.meta.env.VITE_BASE_URL, // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: import.meta.env.VITE_BASE_URL, // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean,
      ) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      },
      logLevel: LogLevel.Error,
    },
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}

import { getCurrentInstance, Ref, toRefs } from 'vue'

export type ApiService = {
  instance: ApiService
}

export function useApiService(): ApiService {
  const internalInstance = getCurrentInstance()
  if (!internalInstance) {
    throw 'useApiService() cannot be called outside the setup() function of a component'
  }
  const { instance, accounts, inProgress } = toRefs(
    internalInstance.appContext.config.globalProperties.$msal,
  )

  return {
    instance: instance.value,
  }
}

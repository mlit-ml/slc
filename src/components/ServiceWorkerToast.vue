<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const dismissToast = async () => {
  offlineReady.value = false
  needRefresh.value = false
}

const message = ref('')

watch(
  [offlineReady, needRefresh],
  ([newOfflineReadyValue, newNeedRefreshValue]) => {
    if (newOfflineReadyValue || newNeedRefreshValue) {
      message.value = newOfflineReadyValue
        ? 'App is ready to work offline!'
        : 'There is new content available! Click reload to update'

      setTimeout(() => (offlineReady.value = false), 5000)
    }
  },
)
</script>

<template>
  <div class="absolute z-50 bottom-3 right-3">
    <div
      v-if="offlineReady"
      id="toast-simple"
      class="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <svg
        class="w-5 h-5 text-blue-600 dark:text-blue-500"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="paper-plane"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
        ></path>
      </svg>
      <div class="pl-4 text-sm font-normal">{{ $t(message) }}</div>
    </div>

    <div
      v-if="needRefresh"
      id="toast-interactive"
      class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div class="flex">
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="ml-3 text-sm font-normal">
          <span
            class="mb-1 text-sm font-semibold text-gray-900 dark:text-white"
            >{{ $t('Update available') }}</span
          >
          <div class="mb-2 text-sm font-normal">
            {{ $t(message) }}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <a
                href="#"
                class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                @click="updateServiceWorker()"
                >{{ $t('Reload') }}</a
              >
            </div>
            <div>
              <a
                href="#"
                class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                @click="dismissToast"
                >{{ $t('Not now') }}</a
              >
            </div>
          </div>
        </div>
        <button
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-interactive"
          aria-label="Close"
          @click="dismissToast"
        >
          <span class="sr-only">{{ $t('Close') }}</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

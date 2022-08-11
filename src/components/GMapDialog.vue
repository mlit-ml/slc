<template>
  <div class="top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
    <div class="relative w-full max-w-md h-full md:h-auto">
      <div class="p-2 text-left">
        <h3 class="mb-2 text-lg font-bold text-gray-500 dark:text-gray-400">
          {{ $t(header) }}
        </h3>
        <p class="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
          {{ $t(footer) }}
        </p>
        <div class="text-center items-center pb-2 md:pb-0">
          <button
            type="button"
            class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg text-sm px-4 py-2 text-center mr-2"
            @click="addToRoute(id)"
          >
            {{ props.buttonText }}
          </button>
          <button
            type="button"
            class="md:mr-0 mr-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="$emit('infoClicked', id)"
          >
            {{ $t('Info') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

const props = defineProps<{
  id: number
  header: string
  footer: string
  buttonText: string
}>()

const emit = defineEmits<{
  (e: 'addToRouteClicked', id: number): void
  (e: 'infoClicked', id: number): void
}>()

const isOpen = ref(true)

function addToRoute(id: number) {
  emit('addToRouteClicked', id)
  setIsOpen(false)
}

function setIsOpen(value: boolean) {
  isOpen.value = value
}
</script>

<style scoped></style>

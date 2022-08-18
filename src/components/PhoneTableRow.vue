<template>
  <tr class="whitespace-nowrap" :class="focusClassObject" @click="rowClicked">
    <slot></slot>
    <a :href="hyperlink" :target="target">
      <div
        :class="[props.noBorders ? '' : 'border-y-2 border-gray-100', classes]"
        :style="styles"
      >
        <td class="px-6 pb-1 relative block">
          <div
            v-if="clickable"
            class="absolute right-0 h-full flex items-center p-2"
          >
            <component
              :is="ChevronRightIcon"
              class="text-indigo-600 w-6 h-6"
            ></component>
          </div>
          <span class="font-medium text-medium text-gray-900 table-row">
            {{ header! }}
          </span>
          <input
            v-if="textInput || textInput == ''"
            :value="textInput"
            class="w-full mt-1 text-medium text-gray-900 table-row"
            :class="header ? '' : 'font-medium'"
            @keyup.enter="inputEnterKeyUp"
            @change="(p) => { emit('textInputChanged', (p.target as HTMLInputElement).value)}"
          />
          <textarea
            v-if="textArea || textArea == ''"
            :value="textArea"
            class="w-full mt-1 text-medium text-gray-900 table-row"
            @keyup.enter="inputEnterKeyUp"
          />
          <span v-if="footer1" class="text-xs text-gray-800 table-row">
            {{ footer1! }}
          </span>
          <span v-if="footer2" class="text-xs text-gray-800 table-row">
            {{ footer2! }}
          </span>
        </td>
      </div>
    </a>
  </tr>
  <div v-if="dateInput" v-show="showDateInput">
    <PhoneDatePicker
      :date-initial="props.dateInput"
      @date-changed="(d: Date) => {emit('dateChanged', d)}"
    ></PhoneDatePicker>
  </div>
</template>

<script setup lang="ts">
import PhoneDatePicker from './PhoneDatePicker.vue'

import { ChevronRightIcon } from '@heroicons/vue/solid'

const props = defineProps<{
  clickable?: boolean
  noBorders?: boolean
  classes?: string
  styles?: string
  header?: string
  footer1?: string
  footer2?: string
  textInput?: string
  textArea?: string
  dateInput?: Date
  hyperlink?: string
}>()

const emit = defineEmits<{
  (e: 'rowClicked', value: MouseEvent): void
  (e: 'textInputChanged', t: string): void
  (e: 'dateChanged', d: Date): void
}>()

onMounted(() => {
  showDateInput.value = false
})

const isTouchScreen = 'ontouchstart' in window

const target = computed(() => {
  return '_blank'
})

const showDateInput = ref(true)

const focusClassObject =
  props.clickable && !props.textInput
    ? 'active:bg-gray-200 focus:bg-gray-200'
    : ''

const scheduledSamplingChanged = async (d: Date) => {}

const rowClicked = async (e: MouseEvent) => {
  emit('rowClicked', e)
  if (props.dateInput) {
    showDateInput.value = !showDateInput.value
  }
}

const inputEnterKeyUp = async (k: KeyboardEvent) => {
  if (!isTouchScreen && k.target instanceof HTMLElement) {
    k.target.blur()
  }
}
</script>

<template>
  <div
    class="text-sm font-small text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul
      id="orders-tabs"
      :class="[props.classes, 'flex flex-wrap']"
      data-tabs-toggle="#orders-tabs-content"
      role="tablist"
    >
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        class="mr-2"
        @click="selectTab(index)"
      >
        <a
          href="#"
          class="inline-block p-1 rounded-t-lg border-b-2 border-transparent"
          :class="activeClass(index)"
          >{{ tab.title }}</a
        >
      </li>
    </ul>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import Tab from '../types/Tab'

const props = defineProps<{
  classes: string
  selectedTabIndex: number
}>()

const emit = defineEmits<{
  (e: 'selectedTabChanged', i: number): void
}>()

const selectedIndex = ref(props.selectedTabIndex)
const selectedTitle = ref()

provide('selectedTitle', selectedTitle)

watch(
  () => props.selectedTabIndex,
  index => {
    selectTab(index)
  },
)

const tabs = ref<Tab[]>()

const slots = useSlots()

const activeClass = (index: number) => {
  if (index == selectedIndex.value) {
    // active
    return 'text-indigo-500 border-indigo-500 active dark:text-indigo-500 dark:border-indigo-500'
  }
  return 'hover:text-gray-900 hover:border-gray-300 dark:hover:text-gray-300'
}

const selectTab = async (i: number) => {
  selectedIndex.value = i
  if (tabs.value) {
    selectedTitle.value = tabs.value[i].title
  }
  emit('selectedTabChanged', i)
}

onMounted(() => {
  if (slots) {
    tabs.value = slots.default?.().map((t): Tab => ({ title: t.props?.title }))
    selectTab(selectedIndex.value)
  }
})
</script>

<style scoped lang="css"></style>

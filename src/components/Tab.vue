<template>
  <div v-show="props.title == selectedTitle" class="tab tab-height relative">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const selectedTitle = inject('selectedTitle')

const props = defineProps<{
  title: string
}>()
</script>

<style scoped>
.tab-height {
  height: calc(100vh - 11rem) !important;
}
</style>

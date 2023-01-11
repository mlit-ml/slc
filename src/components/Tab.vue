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
  /* TODO: If rounded corners in bottom use 10.5 else 8.5  */
  height: calc(100vh - 10.5rem) !important;
}
@media (min-width: 1024px) {
  .tab-height {
    height: calc(100vh - 10.5rem) !important;
  }
}
</style>

<template>
  <div v-show="props.title == selectedTitle" class="tab h-screen relative">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const selectedTitle = inject('selectedTitle')

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <thead class="bg-gray-50 text-left">
    <tr>
      <th class="px-6 py-2 text-xs text-gray-500">
        {{ title! }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

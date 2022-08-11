<template>
  <div class="picker-group">
    <VueScrollPicker v-model="selectedDate" :options="dates" class="px-8" />
    <VueScrollPicker v-model="selectedHours" :options="hours" />
    <VueScrollPicker v-model="selectedMinutes" :options="minutes" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  dateInitial?: Date
}>()

const emit = defineEmits<{
  (e: 'dateChanged', d: Date): void
}>()

const currentDate = props.dateInitial ? props.dateInitial : new Date()

const selectedDate = ref<string>(currentDate.toDateString())
const selectedHours = ref<string>(currentDate.getHours().toString())
const selectedMinutes = ref<string>(currentDate.getMinutes().toString())

watch(
  [selectedDate, selectedHours, selectedMinutes],
  ([date, hours, minutes]) => {
    emit(
      'dateChanged',
      new Date(
        new Date(new Date(date).setHours(parseInt(hours))).setMinutes(
          parseInt(minutes),
        ),
      ),
    )
  },
)

const roughDayOfYear = currentDate.getMonth() * 30 + currentDate.getDay()

const dates = computed(() => {
  const currYear = new Date().getFullYear()
  const lastYear = 1980
  return Array.from({ length: 365 }, (_, index) => {
    const date = new Date(
      new Date().setDate(currentDate.getDate() + (index - roughDayOfYear)),
    ) as Date
    return date.toDateString()
  }).reverse()
})

const hours = computed(() => {
  return Array.from({ length: 24 }, (_, index) =>
    index == 0 ? '00' : index.toString(),
  )
})

const minutes = computed(() => {
  return Array.from({ length: 60 }, (_, index) =>
    index == 0 ? '00' : index.toString(),
  )
})
</script>
<style scoped>
.picker-group {
  display: flex;
}
</style>

<template>
  <div class="h-5/6 w-screen pb-10">
    <calendar-view
      :items="items"
      :show-date="showDate"
      :starting-day-of-week="1"
      :display-period-uom="'week'"
      :enable-drag-drop="true"
      :display-period-count="3"
      :use-default-theme="false"
      :use-holiday-theme="true"
      :item-content-height="'2.8em'"
      class="calendar-view theme-default holiday-us-traditional holiday-us-official"
      @drop-on-date="onItemDropped"
      @click-date="onClickDay"
      @click-item="onClickItem"
    >
      <template #header="{ headerProps }">
        <calendar-view-header
          :header-props="headerProps"
          @input="setShowDate"
        />
      </template>
    </calendar-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from 'vue-simple-calendar'

import CalendarItem from '../types/CalendarItem'

import '../../node_modules/vue-simple-calendar/dist/style.css'
// The next two lines are optional themes
import '../../node_modules/vue-simple-calendar/static/css/default.css'
import '../../node_modules/vue-simple-calendar/static/css/holidays-us.css'
import Route from '../types/Route'

const emit = defineEmits<{
  (e: 'dayDoubleClicked', d: Date): void
  (e: 'itemDoubleClicked', i: CalendarItem): void
}>()

const props = defineProps<{
  routes?: Route[] | undefined
}>()

const showDate = ref(new Date())
const items = ref<CalendarItem[]>()

const setShowDate = async (d: Date) => {
  showDate.value = d
}

const onItemDropped = async (item: CalendarItem, d: Date) => {
  // Determine the delta between the old start date and the date chosen,
  // and apply that delta to both the start and end date to move the item.
  const eLength = CalendarMath.dayDiff(item.startDate, d)

  if (item.originalItem != null) {
    item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength)
    item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
  }
}

let dayDoubleClick: {
  date: number
  millis: number
}

let itemDoubleClick: {
  id: number
  millis: number
}

const onClickDay = async (d: Date) => {
  let date = d.getDate()

  if (dayDoubleClick == null || dayDoubleClick.date != date) {
    dayDoubleClick = { date: date, millis: Date.now() }

    return
  }

  let millis = Date.now()

  if (millis - dayDoubleClick.millis < 500) {
    emit('dayDoubleClicked', d)
  }
  dayDoubleClick = { date: date, millis: Date.now() }
}

const onClickItem = async (item: CalendarItem) => {
  if (itemDoubleClick == null || itemDoubleClick.id != item.id) {
    itemDoubleClick = { id: item.id, millis: Date.now() }
    return
  }

  let millis = Date.now()

  if (millis - itemDoubleClick.millis < 500) {
    emit('itemDoubleClicked', item)
  }
  itemDoubleClick = { id: item.id, millis: Date.now() }
}

watch(
  () => props.routes,
  async (newRoutes, oldRoutes) => {
    if (newRoutes) {
      items.value = newRoutes.map((r: Route): CalendarItem => {
        return {
          id: r.routeId,
          startDate: r.scheduledSampling,
          title: r.description,
        }
      })
    }
  },
)
</script>

<style></style>

<style lang="scss" scoped>
:deep(.cv-item) {
  white-space: normal;
  height: 2.8em;
}

:deep(.cv-item:active) {
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

:deep(.cv-header-nav .previousYear),
:deep(.cv-header-nav .nextYear) {
  display: none;
}

.cv-header-nav .nextYear,
.cv-header-nav .previousYear {
  display: none;
}
.cv-header .periodLabel {
  font-size: 1.125rem !important; /* 18px */
  line-height: 1.75rem !important; /* 28px */
}
.calendar-view {
  height: 85vh !important;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>

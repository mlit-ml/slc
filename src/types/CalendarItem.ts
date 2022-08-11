export default interface CalendarItem {
  // Required
  id: number
  startDate: Date
  title: string

  // Optional
  endDate?: Date
  url?: string
  classes?: Array<string> | null
  style?: string

  originalItem?: CalendarItem
  itemRow?: number
}

import Customer from './Customer'
import Sample from './Sample'

export default interface Order {
  orderId: number
  routeGuid: string
  description: string // usually concat string of places
  routeOrderNo?: number
  icon: string
  applicantId: number
  latitude: number
  longitude: number
  contact: Customer
  samples: [Sample]
}

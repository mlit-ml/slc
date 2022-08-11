import Customer from './Customer'
import Place from './Place'

export default interface Waypoint {
  orderId: number
  lat: number
  lon: number
  contact: Customer
  places: Place[]
}

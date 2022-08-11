import Order from './Order'

export default interface Route {
  routeId: number
  description: string
  scheduledSampling: Date
  orders: Order[]
}

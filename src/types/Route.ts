import Order from './Order'
import Packaging from './Packaging'
import SampleCollector from './SampleCollector'

export default interface Route {
  routeId: number
  description: string
  scheduledSampling: Date
  sampleCollector?: SampleCollector
  guid?: string
  orders: Order[]
  packaging: Packaging[]
}

import Waypoint from './Waypoint'

export default interface Route {
  routeId: number
  description: string
  scheduledSampling: Date
  waypoints: Waypoint[]
}

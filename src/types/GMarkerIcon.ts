import GPoint from './GPoint'

export default interface GMarkerIcon {
  path: string
  scale: number
  strokeColor: string
  strokeOpacity: number
  fillColor: string
  fillOpacity: number
  anchor: GPoint
}

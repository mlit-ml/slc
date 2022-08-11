import GPosition from './GPosition'
import GInfoWindow from './GInfoWindow'
import GMarkerIcon from './GMarkerIcon'

export default interface GMarker {
  id: number
  position: GPosition
  icon: GMarkerIcon | string
  clickable: boolean
  draggable: boolean
  infoWindow: GInfoWindow
}

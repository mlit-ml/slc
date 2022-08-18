import Packaging from './Packaging'
import Place from './Place'

export default interface Sample {
  sampleId: number
  place: Place
  type: string
  label: string
  packaging: Packaging[]
}

import Packaging from './Packaging'
import Place from './Place'

export default interface Sample {
  sampleId: number
  createdBy: string
  place: Place
  type: string
  scope: string
  label: string
  packaging: Packaging[]
}

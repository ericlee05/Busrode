import { CityCode } from "../City/City"

export interface BusLine{
  city:CityCode
  id:string
  name:string
  src:string
  dst:string
}
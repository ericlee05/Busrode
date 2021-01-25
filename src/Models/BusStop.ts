import { CityCode } from "../City/City"

export interface BusStop{
  city:CityCode
  id:string
  name:string
  lat:number
  lng:number
}
import { CityCode } from "../City/City"

export interface BusArrival{
  city:CityCode
  busID:string
  leftStops:number //남은 정류장 수
  leftMinutes:number //남은 시간(분)
}
import { BusArrival } from "../Models/BusArrival"
import { BusLine } from "../Models/BusLine"
import { BusStop } from "../Models/BusStop"

export class CityClass{
  City:CityCode

  constructor(){
    this.City = CityCode.NONE
  }

  //이름으로 정류장을 찾아 반환 
  findStop(name:string):Promise<Array<BusStop>> | Array<BusStop>{
    return []
  }

  //이름으로 노선을 찾아 반환
  findLine(name:string):Promise<Array<BusLine>> | Array<BusLine>{
    return []
  }

  //도착정보 얻기
  getArrivalInfo(stopID:string, lineID:string):Promise<BusArrival | undefined> | undefined | BusArrival{
    return undefined
  }

}

export enum CityCode{
  NONE,
  Yangsan,
  Busan,
  Ulsan,
  Gimhae,
  Daegu,
  Seoul
}
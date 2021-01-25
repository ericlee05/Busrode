import { CityClass, CityCode } from "./City/City"
import { Yangsan } from "./City/Yangsan/Yangsan"
import { BusArrival } from "./Models/BusArrival"
import { BusLine } from "./Models/BusLine"
import { BusStop } from "./Models/BusStop"

export class Busrode extends CityClass{
  private readonly CityWrapper:CityClass
  private Cities:Array<CityClass> = [
    new Yangsan()
  ]

  constructor(CityType:CityCode){
    super()
    this.CityWrapper = this.Cities.find(c => c.City == CityType)!
  }

  //이름으로 정류장을 찾아 반환 
  async findStop(name:string):Promise<Array<BusStop>>{
    return await this.CityWrapper.findStop(name)
  }

  //이름으로 노선을 찾아 반환
  async findLine(name:string){
    return await this.CityWrapper.findLine(name)
  }

  //도착정보 얻기
  async getArrivalInfo(stopID:string, lineID:string){
    return await this.CityWrapper.getArrivalInfo(stopID, lineID)
  }

}
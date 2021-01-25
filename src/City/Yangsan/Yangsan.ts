import axios from "axios"
import urljoin from "url-join"
import xml2js from "xml2js"
import iconv from "iconv-lite"

import { BusArrival } from "../../Models/BusArrival"
import { BusLine } from "../../Models/BusLine"
import { BusStop } from "../../Models/BusStop"
import { CityClass, CityCode } from "../City"

export class Yangsan extends CityClass{
  private readonly API_URL = "http://bus.yangsan.go.kr/yangsan_2016/bus_map/ajax/"

  constructor(){
    super()
    this.City = CityCode.Yangsan
  }

  //이름으로 정류장을 찾아 반환 
  async findStop(name:string):Promise<Array<BusStop>>{
    const url = urljoin(this.API_URL, "station_list.php", `?schType=station&keyword1=${encodeURI(name)}`)
    const XML = iconv.decode((await axios({method:"GET", url, responseType:"arraybuffer"})).data, "EUC-KR")
    const Data = await xml2js.parseStringPromise(XML)
    const RawStops = Data.root.result1 as Array<any>

    return RawStops.map(stop => <BusStop>{
      city:this.City, id:stop.$.staID,
      name:stop.$.staNm, lat:stop.$.GPS_Y, lng:stop.$.GPS_X
    })
  }

  //이름으로 노선을 찾아 반환
  async findLine(name:string){
    const url = urljoin(this.API_URL, "line_list.php", `?schType=line_showAll&keyword1=${encodeURI(name)}`)
    const XML = iconv.decode((await axios({method:"GET", url, responseType:"arraybuffer"})).data, "EUC-KR")
    const Data = await xml2js.parseStringPromise(XML)
    const RawStops = Data.root.result1 as Array<any>
    
    return RawStops.map(line => <BusLine>{
      city:this.City, id:line.$.id, name:line.$.name, src:line.$.sName, dst:line.$.eName
    })
  }

  //도착정보 얻기
  async getArrivalInfo(stopID:string, lineID:string){
    const url = urljoin(this.API_URL, "station_list.php", `?schType=loc_arrive_info&keyword1=${encodeURI(stopID)}&keyword2=${encodeURI(lineID)}`)
    const XML = iconv.decode((await axios({method:"GET", url, responseType:"arraybuffer"})).data, "EUC-KR")
    const Data = await xml2js.parseStringPromise(XML)
    const RawArrival = Data.root.result2
    try{
      return <BusArrival>{
        city:this.City, busID:lineID, leftStops:RawArrival[0].$.DIFF_STOP, leftMinutes:RawArrival[0].$.time
      } || undefined
    }catch(ex){return undefined}
  }

  
}
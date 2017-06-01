import {remote} from 'electron'
import path from 'path'
import fs from 'fs'

class ApiInfo{
  //make sure there is only one instance
  static instance

  constructor(name, data){
    //return existing instance or make new
    if(ApiInfo.instance){
      return ApiInfo.instance
    }
    this.filePath = path.join(remote.app.getPath('userData'), 'ct.json')
    this.open()
    ApiInfo.instance = this
  }
  save(){
    fs.writeFileSync(this.filePath , JSON.stringify(this.data))
  }
  open(){
    try {
      this.data = JSON.parse(fs.readFileSync(this.filePath))
    } catch(error) {
      this.data = {}
      console.log(error)
    }
  }
  get(key){
    return this.data[key]
  }
  set(key, value){
    this.data[key] = value
    this.save()
  }
}

export default new ApiInfo()

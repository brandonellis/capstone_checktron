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
  //new
  setAuth(url, apiKey, apiSecret){
    if(!this.data.auth) this.data.auth = {}
    if(!this.data.auth[url]) this.data.auth[url] = {}
    this.data.auth[url][apiKey] = apiSecret
    this.save()
  }
  //get a lists of options for url, (auto complete)
  getUrl(){
    if(!this.data.auth) return []
    return Object.keys(this.data.auth)
  }
  //get list of api keys, (auto complete)
  getApiKey(url){
    var dataList = []
    if(!this.data.auth || !this.data.auth[url]) return []
    return Object.keys(this.data.auth[url])
  }
  getApiSecret(url, apiKey){
    var dataList = []
    if(!this.data.auth || !this.data.auth[url] || !this.data.auth[url][apiKey]) return ''
    return this.data.auth[url][apiKey]
  }
  removeUrl(url){
    if(this.data.auth && this.data.auth[url]){
      delete this.data.auth[url]
      this.save()
    }
  }
  removeApiKey(url, apiKey){
    if(this.data.auth && this.data.auth[url] && this.data.auth[url][apiKey]){
      delete this.data.auth[url][apiKey]
      if(Object.keys(this.data.auth[url]).length < 1){
        delete this.data.auth[url]
      }
      this.save()
    }
  }
}

export default new ApiInfo()

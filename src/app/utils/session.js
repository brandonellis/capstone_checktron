import axios from 'axios'

class Session{
  //make sure there is only one instance
  static instance

  constructor(){
    //return existing instance or make new
    if(this.instance){
      return this.instance
    }
    this.axios = false
    this.url = false
    this.instance = this
  }

  logIn(url, user, pass, func){
    this.url = url
    this.axios = require('axios').create({
      baseURL: url ? url + 'api/3.0/' : '',
      auth: {
        username: user ? user : '',
        password: pass ? pass : ''
      }
    })
    this.loggedIn(func)
  }

  logOut(){
    this.url = false
    this.axios = false
  }

  loggedIn(func){
    try{
      this.axios.get('ping').then(resp=>{
        func(resp.data.request.status === 'OK')
      }).catch(error=>{
        this.axios = false
        this.url = false
        func(false)
      })
    }catch(error){
      this.axios = false
      this.url = false
      func(false)
    }
  }
}

export default new Session()
